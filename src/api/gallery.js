import { apiRequest } from "./config";

/**
 * Fetch paginated gallery images from programs.
 * @param {number} page
 * @param {number} perPage
 * @returns {Promise<{ items: Array, totalPages: number }>}
 */
export async function fetchGallery(page = 1, perPage = 12) {
  try {
    const { data, headers, error } = await apiRequest("/programs", {
      _embed: true,
      page,
      per_page: perPage,
    });

    if (error) {
      console.error("Error fetching gallery:", error);
      return { items: [], totalPages: 1 };
    }

    const totalPages = headers
      ? parseInt(headers.get("X-WP-TotalPages") || "1", 10)
      : 1;

    const items = data
      .flatMap((item) => {
        const acf = item.acf || {};
        const galleryImages = acf.photo_gallery || []; // Assuming 'photo_gallery' is the ACF field for the gallery

        if (galleryImages.length > 0) {
          return galleryImages.map((image) => ({
            id: `${item.id}-${image.id}`, // Create a unique ID for each image
            title: image.title || acf.program_heading || "Untitled",
            url: image.url,
            alt: image.alt || acf.program_heading,
            slug: item.slug,
          }));
        }

        // Fallback to a single image if no gallery exists
        const singleImage =
          acf.picture?.url ||
          acf.opt_picture?.url ||
          item._embedded?.["wp:featuredmedia"]?.[0]?.source_url;

        if (singleImage) {
          return [
            {
              id: item.id,
              title: acf.program_heading || "Untitled",
              url: singleImage,
              alt: acf.program_heading,
              slug: item.slug,
            },
          ];
        }

        return [];
      })
      .filter(Boolean);

    return { items, totalPages };
  } catch (err) {
    console.error("Error fetching gallery:", err);
    return { items: [], totalPages: 1 };
  }
}
