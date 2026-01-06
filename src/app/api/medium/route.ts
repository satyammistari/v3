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

    // Debug log to check structure
    // console.log("Medium API: Parsed XML structure keys:", Object.keys(result || {}));
    if (result?.rss?.channel) {
      // console.log("Medium API: RSS Channel keys:", Object.keys(result.rss.channel[0]));
    }

    if (!result?.rss?.channel?.[0]?.item) {
      console.error('Invalid RSS structure. Result keys:', Object.keys(result || {}));
      console.log('Full result snippet:', JSON.stringify(result).substring(0, 200));
      return NextResponse.json({ posts: [] });
    }

    const posts = result.rss.channel[0].item.slice(0, 4).map((item: any) => {
      // Extract first image from content
      const contentEncoded = item['content:encoded']?.[0] || '';
      const imageMatch = contentEncoded.match(/<img[^>]+src="([^">]+)"/);
      const image = imageMatch ? imageMatch[1] : '';

      // Clean description
      const description = item.description?.[0]?.replace(/<[^>]*>/g, '').substring(0, 150) + '...' || '';

      // Generate slug from title
      const slug = item.title[0]
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');

      return {
        title: item.title[0],
        slug,
        link: item.link[0],
        pubDate: item.pubDate[0],
        description,
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
