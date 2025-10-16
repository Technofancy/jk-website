// import { apiRequest, extractImageUrl, cleanHtmlContent, formatDate } from './config.js';
// /src/api/programs.js
import { apiRequest } from "./config.js";

/**
 * Fetch programs with pagination — only ACF data
 * @param {number} page
 * @param {number} perPage
 * @returns {Promise<{ items: Array, totalPages: number }>}
 */
export async function fetchPrograms(page = 1, perPage = 9) {
  const { data, error, headers } = await apiRequest("/programs", {
    per_page: perPage,
    page,
    orderby: "date",
    order: "desc",
  });

  if (error) {
    console.error("Error fetching programs:", error);
    return { items: [], totalPages: 1 };
  }

  const totalPages = parseInt(headers?.get("X-WP-TotalPages")) || 1;

  const items = (data || []).map((item) => ({
    id: item.id,
    title: item.title || {},
    acf: {
      // Ensure acf object contains all necessary fields
      ...(item.acf || {}), // Spread existing acf properties
      program_heading: item.acf?.program_heading || "",
      start_date: item.acf?.start_date || "",
      end_date: item.acf?.end_date || "",
      picture: item.acf?.picture || null,
      text_contents: item.acf?.text_contents || "",
    },
    slug: item.slug || "", // Assuming slug is also needed for the Link component
  }));

  return { items, totalPages };
}
