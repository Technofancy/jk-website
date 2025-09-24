// src/api/news.js
export async function fetchNews() {
  try {
    const [programsRes, pressRes] = await Promise.all([
      fetch("https://jarokilo.org.np/wp/wp-json/wp/v2/programs?_embed"),
      fetch("https://jarokilo.org.np/wp/wp-json/wp/v2/press-releases?_embed"),
    ]);

    const [programs, pressReleases] = await Promise.all([
      programsRes.json(),
      pressRes.json(),
    ]);

    // Normalizer
    const normalize = (items, type) =>
      items.map((item) => {
        const acf = item.acf || {};
        return {
          id: item.id,
          type, // "program" or "press"
          title: item.title?.rendered || "",
          excerpt: item.excerpt?.rendered || "",
          link: item.link,
          date: item.date,
          // Fallback to featured image, or ACF picture if available
          featured_media_url:
            item._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
            acf.picture?.url ||
            acf.image_proof?.url ||
            null,

          // Attach ACF fields for later use
          acf,
        };
      });

    const allNews = [...normalize(programs, "program"), ...normalize(pressReleases, "press")];

    // Sort newest first
    allNews.sort((a, b) => new Date(b.date) - new Date(a.date));

    return allNews;
  } catch (error) {
    console.error("Error fetching news:", error);
    return [];
  }
}
