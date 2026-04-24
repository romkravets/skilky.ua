export interface BihusArticle {
  title: string;
  link: string;
  pubDate: string;
  description: string;
  categories: string[];
}

export async function fetchBihusNews(count = 6): Promise<BihusArticle[]> {
  try {
    const res = await fetch('https://bihus.info/feed/', {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; kradene.ua/1.0)' },
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    const xml = await res.text();
    return parseRss(xml, count);
  } catch {
    return [];
  }
}

function getText(xml: string, tag: string): string {
  const match = xml.match(new RegExp(`<${tag}[^>]*>(?:<!\\[CDATA\\[)?([\\s\\S]*?)(?:\\]\\]>)?<\\/${tag}>`, 's'));
  return match ? match[1].trim() : '';
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').replace(/&[a-z]+;/gi, ' ').replace(/\s+/g, ' ').trim();
}

function parseRss(xml: string, count: number): BihusArticle[] {
  const items: BihusArticle[] = [];
  const itemMatches = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)];

  for (const match of itemMatches) {
    if (items.length >= count) break;
    const item = match[1];

    const title = stripHtml(getText(item, 'title'));
    const pubDate = getText(item, 'pubDate');
    const rawDesc = getText(item, 'description');
    const description = stripHtml(rawDesc).slice(0, 220);

    const linkMatch = item.match(/<link>([\s\S]*?)<\/link>/);
    const link = linkMatch ? linkMatch[1].trim() : '';

    const categories: string[] = [];
    for (const cat of item.matchAll(/<category[^>]*>(?:<!\[CDATA\[)?(.*?)(?:\]\]>)?<\/category>/g)) {
      categories.push(cat[1].trim());
    }

    if (title && link) {
      items.push({ title, link, pubDate, description, categories });
    }
  }

  return items;
}
