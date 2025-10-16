// src/api/news.js
export async function fetchNews(page = 1, perPage = 9) {
  try {
    // Fetch programs
    const programsRes = await fetch(
      `https://jarokilo.org.np/wp/wp-json/wp/v2/programs?_embed&per_page=${perPage}&page=${page}`
    );
    const programs = await programsRes.json();

    // Fetch press releases
    const pressRes = await fetch(
      `https://jarokilo.org.np/wp/wp-json/wp/v2/press-releases?_embed&per_page=${perPage}&page=${page}`
    );
    const press = await pressRes.json();

    // Normalize items using ACF title
    const normalize = (item, type) => ({
      id: item.id,
      type,
      date: item.date,
      title:
        item.acf?.program_heading || // Programs
        item.acf?.subject ||         // Press
        "Untitled",
      content: item.acf?.full_content || item.content?.rendered || "",
      acf: item.acf || {},
      featured_media_url:
        item._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
        item.acf?.image_proof?.url ||
        item.acf?.picture?.url ||
        null,
    });

    // Merge and sort by date descending
    const all = [
      ...programs.map((p) => normalize(p, "कार्यक्रम")),
      ...press.map((p) => normalize(p, "प्रेस विज्ञप्ति")),
    ];

    // Remove duplicates (same type + id)
    const unique = all.filter(
      (v, i, a) => a.findIndex((x) => x.type === v.type && x.id === v.id) === i
    );

    // Sort newest first
    unique.sort((a, b) => new Date(b.date) - new Date(a.date));

    return unique;
  } catch (error) {
    console.error("Error fetching news:", error);
    return [];
  }
}
