import { apiRequest, extractImageUrl, cleanHtmlContent, formatDate } from './config.js';

export async function fetchBooks(params = {}) {
  const { data, error } = await apiRequest('/books', {
    per_page: 20,
    orderby: 'date',
    order: 'desc',
    ...params
  });

  if (error) {
    console.warn("fetchBooks failed:", error);
    return [];
  }

  if (!data || !Array.isArray(data)) {
    return [];
  }

  return data.map(item => ({
    id: item.id,
    title: item.title?.rendered || 'Untitled',
    excerpt: cleanHtmlContent(item.excerpt?.rendered || ''),
    content: item.content?.rendered || '',
    link: item.link,
    date: item.date,
    formattedDate: formatDate(item.date),
    imageUrl: extractImageUrl(item),
    acf: item.acf || {},
    author: item.acf?.author || 'Unknown Author',
    isbn: item.acf?.isbn || '',
    publisher: item.acf?.publisher || '',
    publicationYear: item.acf?.publication_year || '',
    pages: item.acf?.pages || '',
    language: item.acf?.language || 'Nepali',
    category: item.acf?.category || 'General',
    downloadUrl: item.acf?.download_url || '',
    externalLink: item.acf?.external_link || ''
  }));
}

export async function fetchBookById(id) {
  const { data, error } = await apiRequest(`/books/${id}`);
  
  if (error || !data) {
    return null;
  }

  return {
    id: data.id,
    title: data.title?.rendered || 'Untitled',
    excerpt: cleanHtmlContent(data.excerpt?.rendered || ''),
    content: data.content?.rendered || '',
    link: data.link,
    date: data.date,
    formattedDate: formatDate(data.date),
    imageUrl: extractImageUrl(data),
    acf: data.acf || {},
    author: data.acf?.author || 'Unknown Author',
    isbn: data.acf?.isbn || '',
    publisher: data.acf?.publisher || '',
    publicationYear: data.acf?.publication_year || '',
    pages: data.acf?.pages || '',
    language: data.acf?.language || 'Nepali',
    category: data.acf?.category || 'General',
    downloadUrl: data.acf?.download_url || '',
    externalLink: data.acf?.external_link || ''
  };
}

export async function searchBooks(query) {
  const { data, error } = await apiRequest('/books', {
    search: query,
    per_page: 10
  });

  if (error || !data) {
    return [];
  }

  return data.map(item => ({
    id: item.id,
    title: item.title?.rendered || 'Untitled',
    excerpt: cleanHtmlContent(item.excerpt?.rendered || ''),
    imageUrl: extractImageUrl(item),
    author: item.acf?.author || 'Unknown Author'
  }));
}
