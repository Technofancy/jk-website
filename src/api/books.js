import { apiRequest, API_CONFIG, extractImageUrl, formatDate } from "./config";

/**
 * Fetches a paginated list of books.
 *
 * @param {number} page - The page number to fetch.
 * @param {number} per_page - The number of items per page.
 * @returns {Promise<{items: Array, totalPages: number}>}
 */
export const fetchBooks = async (page = 1, per_page = 12) => {
  const { data, headers, error } = await apiRequest(
    API_CONFIG.ENDPOINTS.BOOKS,
    {
      page,
      per_page,
      _embed: true, // Ensure embedded data is included
    }
  );

  if (error || !data) {
    console.error("Error fetching books:", error);
    return { items: [], totalPages: 1 };
  }

  const totalPages = parseInt(headers.get("X-WP-TotalPages"), 10) || 1;

  const items = data.map((item) => ({
    id: item.id,
    slug: item.slug,
    title: item.title.rendered,
    author: item.acf?.author || "Unknown Author",
    // Use acf.about_book for the excerpt, fallback to rendered excerpt
    excerpt: item.acf?.about_book || item.excerpt.rendered,
    imageUrl: extractImageUrl(item),
    formattedDate: formatDate(item.date),
    pages: item.acf?.pages || null,
    category: item.acf?.category || "General",
  }));

  return { items, totalPages };
};

/**
 * Fetches a single book by its slug.
 *
 * @param {string} slug - The slug of the book to fetch.
 * @returns {Promise<object|null>}
 */
export async function fetchBookBySlug(slug) {
  const { data, error } = await apiRequest(API_CONFIG.ENDPOINTS.BOOKS, {
    slug,
    per_page: 1,
  });

  if (error) {
    throw new Error(error);
  }

  if (error || !data || data.length === 0) {
    console.error(`Error fetching book by slug ${slug}:`, error);
    return null;
  }

  const item = data[0];
  return {
    id: item.id,
    slug: item.slug,
    title: item.title.rendered,
    // Use acf.about_book for the main content
    content: item.acf?.about_book || item.content.rendered,
    author: item.acf?.author || "Unknown Author",
    imageUrl: extractImageUrl(item),
    formattedDate: formatDate(item.date),
    pages: item.acf?.pages || null,
    downloadLink: item.acf?.download_link || null,
    category: item.acf?.category || "General",
    isbn: item.acf?.isbn || null,
  };
};