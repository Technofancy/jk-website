// /src/api/press.js
import { apiRequest } from "./config.js";

/**
 * Fetch paginated press releases (ACF only)
 * @param {number} page
 * @param {number} perPage
 * @returns {Promise<{ items: Array, totalPages: number }>}
 */
export async function fetchPress(page = 1, perPage = 9) {
  const { data, error, headers } = await apiRequest("/press-releases", {
    per_page: perPage,
    page,
    orderby: "date",
    order: "desc",
  });

  if (error) {
    console.error("Error fetching press releases:", error);
    return { items: [], totalPages: 1 };
  }

  const totalPages = parseInt(headers?.get("X-WP-TotalPages")) || 1;

  const items = (data || []).map((item) => ({
    id: item.id,
    title: item.title || {},
    acf: item.acf || {},
    date: item.date,
  }));

  return { items, totalPages };
}
