// API Configuration
export const API_CONFIG = {
  BASE_URL: "https://jarokilo.org.np/wp/wp-json/wp/v2",
  ENDPOINTS: {
    BOOKS: "/books",
    PROGRAMS: "/programs",
    PRESS: "/press-releases",
    NEWS: "/posts", // Generic posts endpoint
    GALLERY: "/media",
  },
  DEFAULT_PARAMS: {
    _embed: true,
    per_page: 20,
    _fields: "id,title,link,date,excerpt,content,acf,_embedded",
  },
};

// Generic API fetch function with error handling
export async function apiRequest(endpoint, params = {}) {
  const url = new URL(`${API_CONFIG.BASE_URL}${endpoint}`);

  // Add default params
  Object.entries({ ...API_CONFIG.DEFAULT_PARAMS, ...params }).forEach(
    ([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.append(key, value);
      }
    }
  );

  const cacheKey = `api-cache:${url.toString()}`;
  const requestHeaders = new Headers();
  let cachedResponse = null;

  // Try to get data from session storage
  try {
    const cached = sessionStorage.getItem(cacheKey);
    if (cached) {
      cachedResponse = JSON.parse(cached);
      // Use headers from the cached response for revalidation
      const lastModified = cachedResponse.headers["last-modified"];
      const etag = cachedResponse.headers["etag"];

      if (lastModified) {
        requestHeaders.append("If-Modified-Since", lastModified);
      }
      if (etag) {
        requestHeaders.append("If-None-Match", etag);
      }
    }
  } catch (e) {
    console.warn("Could not read from session cache", e);
  }

  try {
    const response = await fetch(url.toString(), { headers: requestHeaders });

    // If server says content is not modified, use the cached version
    if (response.status === 304 && cachedResponse) {
      return {
        data: cachedResponse.data,
        headers: new Headers(cachedResponse.headers),
        error: null,
      };
    }

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const responseHeaders = Object.fromEntries(response.headers.entries());

    // Save new data and headers to session storage
    try {
      const cacheValue = JSON.stringify({ data, headers: responseHeaders });
      sessionStorage.setItem(cacheKey, cacheValue);
    } catch (e) {
      console.warn("Could not write to session cache", e);
    }

    return { data, headers: response.headers, error: null };
  } catch (error) {
    // If the fetch fails (e.g., user is offline) and we have cached data, serve it
    if (cachedResponse) {
      console.warn(
        `API request failed for ${endpoint}. Serving stale data from cache.`,
        error
      );
      return {
        data: cachedResponse.data,
        headers: new Headers(cachedResponse.headers),
        error: null,
      };
    }
    console.error(`API request failed for ${endpoint}:`, error);
    return { data: null, headers: null, error: error.message };
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
    item._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
    null
  );
}

// Utility function to clean HTML content
export function cleanHtmlContent(html) {
  if (!html) return "";

  // Remove HTML tags and decode entities
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = html;
  return tempDiv.textContent || tempDiv.innerText || "";
}

// Utility function to format date
export function formatDate(dateString, locale = "en-US") {
  if (!dateString) return "";

  const date = new Date(dateString);
  return date.toLocaleDateString(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
