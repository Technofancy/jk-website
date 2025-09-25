import { apiRequest, extractImageUrl, cleanHtmlContent, formatDate } from './config.js';

export async function fetchPrograms(params = {}) {
  const { data, error } = await apiRequest('/programs', {
    per_page: 20,
    orderby: 'date',
    order: 'desc',
    ...params
  });

  if (error) {
    console.error("Error fetching programs:", error);
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
    location: item.acf?.location || '',
    startDate: item.acf?.start_date || '',
    endDate: item.acf?.end_date || '',
    participants: item.acf?.participants || '',
    organizer: item.acf?.organizer || 'Jaro Kilo Foundation',
    category: item.acf?.category || 'General',
    status: item.acf?.status || 'completed',
    description: item.acf?.description || '',
    objectives: item.acf?.objectives || [],
    outcomes: item.acf?.outcomes || [],
    gallery: item.acf?.gallery || []
  }));
}

export async function fetchProgramById(id) {
  const { data, error } = await apiRequest(`/programs/${id}`);
  
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
    location: data.acf?.location || '',
    startDate: data.acf?.start_date || '',
    endDate: data.acf?.end_date || '',
    participants: data.acf?.participants || '',
    organizer: data.acf?.organizer || 'Jaro Kilo Foundation',
    category: data.acf?.category || 'General',
    status: data.acf?.status || 'completed',
    description: data.acf?.description || '',
    objectives: data.acf?.objectives || [],
    outcomes: data.acf?.outcomes || [],
    gallery: data.acf?.gallery || []
  };
}

export async function fetchProgramsByCategory(category) {
  const { data, error } = await apiRequest('/programs', {
    'meta_key': 'category',
    'meta_value': category,
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
    date: item.date,
    formattedDate: formatDate(item.date),
    category: item.acf?.category || 'General'
  }));
}

export async function fetchUpcomingPrograms() {
  const { data, error } = await apiRequest('/programs', {
    'meta_key': 'status',
    'meta_value': 'upcoming',
    per_page: 5,
    orderby: 'meta_value',
    order: 'asc'
  });

  if (error || !data) {
    return [];
  }

  return data.map(item => ({
    id: item.id,
    title: item.title?.rendered || 'Untitled',
    startDate: item.acf?.start_date || '',
    location: item.acf?.location || '',
    imageUrl: extractImageUrl(item)
  }));
}
