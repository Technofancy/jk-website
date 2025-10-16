import { apiRequest, cleanHtmlContent, extractImageUrl, formatDate } from './config.js';

export async function fetchBooks(params = {}) {
  const { data, error } = await apiRequest('/books', {
    per_page: 12,
    orderby: 'date',
    order: 'desc',
    ...params,
  });

  if (error || !data || !Array.isArray(data)) return [];

  return data.map(item => ({
    id: item.id,
    title: item.acf?.title || item.title?.rendered || 'Untitled',
    author: item.acf?.author || 'Unknown Author',
    excerpt: cleanHtmlContent(item.acf?.about_book || item.excerpt?.rendered || ''),
    content: item.content?.rendered || item.acf?.about_book || '',
    imageUrl: extractImageUrl(item) || item.acf?.cover_image?.url || '/images/book-placeholder.png',
    link: item.link,
    date: item.date,
    formattedDate: formatDate(item.date),
    isbn: item.acf?.isbn || '',
    publisher: item.acf?.publisher || '',
    publicationYear: item.acf?.publication_year || '',
    pages: item.acf?.pages || '',
    language: item.acf?.language || 'Nepali',
    downloadUrl: item.acf?.download_url || '',
    externalLink: item.acf?.external_link || '',
    category: item.acf?.category || 'General',
  }));
}
