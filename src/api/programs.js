// src/api/programs.js
export async function fetchPrograms() {
  try {
    const res = await fetch(
      "https://jarokilo.org.np/wp/wp-json/wp/v2/programs?_embed"
    );
    const data = await res.json();

    return data.map((item) => {
      const acf = item.acf || {};

      return {
        id: item.id,
        title: item.title?.rendered || "Untitled",
        link: item.link,
        date: item.date,
        acf,
        // Prefer ACF "picture", fallback to opt_picture, then WP featured_media
        image_url:
          acf.picture?.url ||
          acf.opt_picture?.url ||
          item._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
          null,
      };
    });
  } catch (error) {
    console.error("Error fetching programs:", error);
    return [];
  }
}
