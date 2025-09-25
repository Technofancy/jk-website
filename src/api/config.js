// API Configuration
export const API_CONFIG = {
  BASE_URL: 'https://jarokilo.org.np/wp/wp-json/wp/v2',
  ENDPOINTS: {
    BOOKS: '/books',
    PROGRAMS: '/programs',
    PRESS: '/press-releases',
    NEWS: '/posts', // Generic posts endpoint
    GALLERY: '/media'
  },
  DEFAULT_PARAMS: {
    _embed: true,
    per_page: 20,
    _fields: 'id,title,link,date,excerpt,content,acf,_embedded'
  }
};

// Generic API fetch function with error handling
export async function apiRequest(endpoint, params = {}) {
  const url = new URL(`${API_CONFIG.BASE_URL}${endpoint}`);
  
  // Add default params
  Object.entries({ ...API_CONFIG.DEFAULT_PARAMS, ...params }).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      url.searchParams.append(key, value);
    }
  });

  try {
    const response = await fetch(url.toString());
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return { data, error: null };
  } catch (error) {
    console.error(`API request failed for ${endpoint}:`, error);
    return { data: null, error: error.message };
  }
}

// Utility function to extract image URL from various sources
export function extractImageUrl(item) {
  const acf = item.acf || {};
  
  return (
    acf.picture?.url ||
    acf.opt_picture?.url ||
    acf.cover_image?.url ||
    acf.image_proof?.url ||
    item._embedded?.['wp:featuredmedia']?.[0]?.source_url ||
    null
  );
}

// Utility function to clean HTML content
export function cleanHtmlContent(html) {
  if (!html) return '';
  
  // Remove HTML tags and decode entities
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = html;
  return tempDiv.textContent || tempDiv.innerText || '';
}

// Utility function to format date
export function formatDate(dateString, locale = 'en-US') {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  return date.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}