import { NextResponse } from 'next/server';
import { parseString } from 'xml2js';
import { promisify } from 'util';

const parseXML = promisify(parseString);

// Remove @ if present in the username
const MEDIUM_USERNAME = (process.env.MEDIUM_USERNAME || '@mistarisatyam').replace('@', '');

export async function GET() {
  try {
    const response = await fetch(`https://medium.com/feed/@${MEDIUM_USERNAME}`, {
      next: { revalidate: 3600 }, // Cache for 1 hour
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      }
    });

    if (!response.ok) {
      console.error('Medium RSS fetch failed:', response.status, response.statusText);
      throw new Error(`Failed to fetch Medium RSS feed: ${response.status}`);
    }

    const xmlData = await response.text();
    const result: any = await parseXML(xmlData);

    if (!result?.rss?.channel?.[0]?.item) {
      console.error('Invalid RSS structure. Result keys:', Object.keys(result || {}));
      return NextResponse.json({ posts: [] });
    }

    const posts = result.rss.channel[0].item.slice(0, 4).map((item: any) => {
      // Extract first image from content
      const contentEncoded = item['content:encoded']?.[0] || '';
      const imageMatch = contentEncoded.match(/<img[^>]+src="([^">]+)"/);
      const image = imageMatch ? imageMatch[1] : '';

      // Clean description - try multiple sources
      let description = '';

      // Try description field first
      if (item.description?.[0]) {
        const rawDesc = item.description[0];
        // Remove HTML tags and decode entities
        description = rawDesc
          .replace(/<!\[CDATA\[/g, '')
          .replace(/\]\]>/g, '')
          .replace(/<[^>]*>/g, '')
          .replace(/&nbsp;/g, ' ')
          .replace(/&amp;/g, '&')
          .replace(/&lt;/g, '<')
          .replace(/&gt;/g, '>')
          .replace(/&quot;/g, '"')
          .trim();
      }

      // Fallback to content:encoded if description is empty
      if (!description && contentEncoded) {
        description = contentEncoded
          .replace(/<[^>]*>/g, '')
          .replace(/&nbsp;/g, ' ')
          .trim();
      }

      // Truncate and add ellipsis
      description = description.substring(0, 200).trim() + (description.length > 200 ? '...' : '');

      // Generate slug from title
      const slug = item.title[0]
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');

      // Extract summary points (bullet points or key paragraphs)
      const summaryPoints: string[] = [];

      // Look for bullet points in the content
      const bulletMatches = contentEncoded.match(/<li[^>]*>(.*?)<\/li>/gi);
      if (bulletMatches && bulletMatches.length > 0) {
        bulletMatches.slice(0, 5).forEach((bullet) => {
          const cleanPoint = bullet
            .replace(/<[^>]*>/g, '')
            .replace(/&nbsp;/g, ' ')
            .trim();
          if (cleanPoint.length > 10 && cleanPoint.length < 200) {
            summaryPoints.push(cleanPoint);
          }
        });
      }

      // If no bullet points, extract first few paragraphs as key points
      if (summaryPoints.length === 0) {
        const paragraphMatches = contentEncoded.match(/<p[^>]*>(.*?)<\/p>/gi);
        if (paragraphMatches && paragraphMatches.length > 1) {
          paragraphMatches.slice(1, 4).forEach((para) => {
            const cleanPara = para
              .replace(/<[^>]*>/g, '')
              .replace(/&nbsp;/g, ' ')
              .trim();
            if (cleanPara.length > 50 && cleanPara.length < 250) {
              summaryPoints.push(cleanPara);
            }
          });
        }
      }

      console.log('Medium Post:', {
        title: item.title[0],
        descLength: description.length,
        hasDesc: !!description,
        summaryPointsCount: summaryPoints.length
      });

      return {
        title: item.title[0],
        slug,
        link: item.link[0],
        pubDate: item.pubDate[0],
        description,
        summaryPoints,
        image,
        categories: item.category || [],
      };
    });

    return NextResponse.json({ posts });
  } catch (error) {
    console.error('Error fetching Medium posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch Medium posts', posts: [] },
      { status: 200 } // Return 200 to prevent errors in UI
    );
  }
}
