// /src/api/press.js
import { apiRequest } from "./config.js";

/**
 * Fetch paginated press releases (ACF only)
 * @param {number} page
 * @param {number} perPage
 * @returns {Promise<{ items: Array, totalPages: number }>}\n */
export async function fetchPress(page = 1, perPage = 9) {
  const { data, headers, error } = await apiRequest("/press-releases", {
    per_page: perPage,
    page,
    orderby: "date",
    order: "desc",
  });

  if (error) {
    console.error("Error fetching press releases:", error);
    return { items: [], totalPages: 1 };
  }

  const totalPages = headers
    ? parseInt(headers.get("X-WP-TotalPages") || "1", 10)
    : 1;

  const items = (data || []).map((item) => ({
    id: item.id,
    slug: item.slug,
    title: item.acf?.subject || item.title?.rendered || "Untitled",
    content: item.content?.rendered || "",
    date: item.date,
    acf: item.acf || {},
    image:
      item._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
      item.acf?.image_proof?.url ||
      null,
  }));

  return { items, totalPages };
}

/**
 * Fetch a single press release by its slug
 * @param {string} slug
 * @returns {Promise<object|null>}
 */
export async function fetchPressBySlug(slug) {
  const { data, error } = await apiRequest("/press-releases", {
    slug,
    _embed: true,
  });

  if (error) {
    console.error(`Error fetching press release with slug ${slug}:`, error);
    return null;
  }

  if (data && data.length > 0) {
    const item = data[0];
    return {
      id: item.id,
      slug: item.slug,
      title: item.acf?.subject || item.title?.rendered || "Untitled",
      content: item.content?.rendered || "",
      date: item.date,
      acf: item.acf || {},
      image:
        item._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
        item.acf?.image_proof?.url ||
        null,
    };
  }

  return null;
}
