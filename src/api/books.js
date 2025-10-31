import { apiRequest, API_CONFIG, extractImageUrl, formatDate } from "./config";

/**
 * Fetches a paginated list of books.
 *
 * @param {number} page - The page number to fetch.
 * @param {number} perPage - The number of items per page.
 * @returns {Promise<{items: Array, totalPages: number}>}
 */
export async function fetchBooks(page = 1, perPage = 10) {
  const { data, headers, error } = await apiRequest(
    API_CONFIG.ENDPOINTS.BOOKS,
    {
      page,
      per_page: perPage,
      _embed: true, // Ensure embedded data is included
    }
  );

  if (error || !data) {
    console.error("Error fetching books:", error);
    return { items: [], totalPages: 0 };
  }

  const totalPages = parseInt(headers.get("X-WP-TotalPages"), 10) || 1;

  const items = data
    .map((item) => {
      try {
        // Extract the file URL from the ACF file object if it exists
        const downloadUrl = item.acf?.readable_file
          ? item.acf.readable_file.url
          : item.acf?.download_link || null;

        return {
          id: item.id,
          slug: item.slug,
          title: item.acf?.title || item.title?.rendered || "Untitled",
          author: item.acf?.author || "Unknown Author",
          excerpt:
            item.acf?.about_book ||
            item.excerpt?.rendered ||
            "No excerpt available.",
          imageUrl: extractImageUrl(item),
          formattedDate: formatDate(item.date),
          pages: item.acf?.pages || null,
          category: item.acf?.category || "General",
          downloadLink: downloadUrl,
          isbn: item.acf?.isbn || null,
        };
      } catch (e) {
        console.error("Failed to process book item:", item, e);
        return null; // Return null for items that fail to process
      }
    })
    .filter(Boolean); // Filter out any null items

  return { items, totalPages };
}

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
    _embed: true,
  });

  if (error) {
    throw new Error(error);
  }

  if (error || !data || data.length === 0) {
    console.error(`Error fetching book by slug ${slug}:`, error);
    return null;
  }

  const item = data[0];
  try {
    // Extract the file URL from the ACF file object if it exists
    const downloadUrl = item.acf?.readable_file
      ? item.acf.readable_file.url
      : item.acf?.download_link || null;

    return {
      id: item.id,
      slug: item.slug,
      title: item.acf?.title || item.title?.rendered || "Untitled",
      content:
        item.acf?.about_book ||
        item.content?.rendered ||
        "No content available.",
      author: item.acf?.author || "Unknown Author",
      imageUrl: extractImageUrl(item),
      formattedDate: formatDate(item.date),
      pages: item.acf?.pages || null,
      downloadLink: downloadUrl,
      category: item.acf?.category || "General",
      isbn: item.acf?.isbn || null,
    };
  } catch (e) {
    console.error("Failed to process single book item:", item, e);
    return null;
  }
}
