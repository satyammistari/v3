export interface MediumPost {
  title: string;
  link: string;
  pubDate: string;
  creator: string;
  content: string;
  contentSnippet: string;
  guid: string;
  categories: string[];
  thumbnail?: string;
}

export interface BlogItem {
  title: string;
  slug: string;
  description: string;
  publishedAt: string;
  image?: string;
  tags: string[];
  mediumUrl: string;
  readTime: number;
  content: string;
  contentSnippet: string;
}

/**
 * Fetch and parse Medium RSS feed
 * Replace 'YOUR_MEDIUM_USERNAME' with your actual Medium username
 */
export async function fetchMediumPosts(): Promise<BlogItem[]> {
  try {
    // Get Medium username from environment variable
    const rawUsername = process.env.MEDIUM_USERNAME || 'mistarisatyam';
    // Ensure username has @ for the URL
    const mediumUsername = rawUsername.startsWith('@') ? rawUsername : `@${rawUsername}`;

    // Use the cleaned username for the RSS feed
    const rssFeedUrl = `https://medium.com/feed/${mediumUsername}`;

    const response = await fetch(rssFeedUrl, {
      next: { revalidate: 3600 }, // Revalidate every hour
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      }
    });

    if (!response.ok) {
      console.error(`Failed to fetch Medium posts from ${rssFeedUrl}: ${response.status}`);
      return [];
    }

    const xmlData = await response.text();

    // Check if we got valid XML
    if (!xmlData.startsWith('<?xml') && !xmlData.includes('<rss')) {
      console.error('Invalid XML response from Medium');
      return [];
    }

    // Dynamic import for xml2js to avoid build issues if treated as client-side
    // This allows us to parse valid RSS XML consistently without 3rd party APIs
    const { parseString } = await import('xml2js');
    const { promisify } = await import('util');
    const parseXML = promisify(parseString);

    const result: any = await parseXML(xmlData);

    if (!result?.rss?.channel?.[0]?.item) {
      console.error('RSS feed has invalid structure');
      return [];
    }

    return result.rss.channel[0].item.map((item: any) => {
      // Extract first image from content
      const contentEncoded = item['content:encoded']?.[0] || '';
      const imageMatch = contentEncoded.match(/<img[^>]+src="([^">]+)"/);
      const image = imageMatch ? imageMatch[1] : '';

      // Clean description
      const rawDescription = item.description?.[0] || '';
      // Remove CDATA tags if present explicitly
      const cleanRawDescription = rawDescription.replace(/<!\[CDATA\[/g, '').replace(/\]\]>/g, '');
      const textContent = cleanRawDescription.replace(/<[^>]*>/g, '');
      const description = textContent.substring(0, 150).trim() + '...';

      // Generate slug from title
      const slug = item.title[0]
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');

      // Read time estimation
      const wordCount = contentEncoded.split(/\s+/).length;
      const readTime = Math.max(1, Math.ceil(wordCount / 200));

      return {
        title: item.title[0],
        slug,
        description,
        publishedAt: item.pubDate[0],
        image,
        tags: item.categories || [],
        mediumUrl: item.link[0],
        readTime,
        content: contentEncoded, // Full content for detail page
        contentSnippet: description, // Short snippet
      };
    });

  } catch (error) {
    console.error('Error fetching Medium posts:', error);
    return [];
  }
}

/**
 * Get a single Medium post by slug
 */
export async function getMediumPost(slug: string): Promise<BlogItem | null> {
  const posts = await fetchMediumPosts();
  return posts.find(post => post.slug === slug) || null;
}
