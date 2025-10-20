// src/api/news.js
export async function fetchNews(page = 1, perPage = 9) {
  try {
    // Fetch programs
    const programsRes = await fetch(
      `https://jarokilo.org.np/wp/wp-json/wp/v2/programs?_embed&per_page=${perPage}&page=${page}`
    );
    const totalPagesPrograms = programsRes.ok
      ? parseInt(programsRes.headers.get("X-WP-TotalPages") || "1", 10)
      : 0;
    const programs = programsRes.ok ? await programsRes.json() : [];

    // Fetch press releases
    const pressRes = await fetch(
      `https://jarokilo.org.np/wp/wp-json/wp/v2/press-releases?_embed&per_page=${perPage}&page=${page}`
    );
    const totalPagesPress = pressRes.ok
      ? parseInt(pressRes.headers.get("X-WP-TotalPages") || "1", 10)
      : 0;
    const press = pressRes.ok ? await pressRes.json() : [];

    // Normalize items using ACF title
    const normalize = (item, type) => ({
      id: `${type}-${item.id}`,
      slug: item.slug,
      type,
      date: item.date,
      title:
        item.acf?.program_heading || // Programs
        item.acf?.subject || // Press
        item.title?.rendered || // Fallback for default title field
        "Untitled",
      content: item.acf?.full_content || item.content?.rendered || "",
      acf: item.acf || {},
      // Renamed from featured_media_url to image for consistency with NewsPage.jsx
      image:
        item._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
        item.featured_media?.source_url || // Added this as another potential source
        item.acf?.image_proof?.url ||
        item.acf?.picture?.url ||
        null,
    });

    // Merge and sort by date descending
    const all = [
      ...(Array.isArray(programs)
        ? programs.map((p) => normalize(p, "कार्यक्रम"))
        : []),
      ...(Array.isArray(press)
        ? press.map((p) => normalize(p, "प्रेस विज्ञप्ति"))
        : []),
    ];

    // Remove duplicates (same unique id)
    const unique = all.filter(
      (v, i, a) => a.findIndex((x) => x.id === v.id) === i
    );

    // Sort newest first
    unique.sort((a, b) => new Date(b.date) - new Date(a.date));

    return {
      items: unique,
      totalPages: Math.max(totalPagesPrograms, totalPagesPress),
    };
  } catch (error) {
    console.error("Error fetching news:", error);
    return { items: [], totalPages: 0 };
  }
}

export async function fetchNewsBySlug(slug) {
  const normalize = (item, type) => ({
    id: item.id,
    slug: item.slug,
    type,
    date: item.date,
    title:
      item.acf?.program_heading ||
      item.acf?.subject ||
      item.title?.rendered ||
      "Untitled",
    content: item.acf?.full_content || item.content?.rendered || "",
    acf: item.acf || {},
    image:
      item._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
      item.featured_media?.source_url ||
      item.acf?.image_proof?.url ||
      item.acf?.picture?.url ||
      null,
  });

  try {
    // Try fetching from programs
    let response = await fetch(
      `https://jarokilo.org.np/wp/wp-json/wp/v2/programs?slug=${slug}&_embed&per_page=1`
    );
    let data = await response.json();
    if (data.length > 0) {
      return normalize(data[0], "कार्यक्रम");
    }

    // If not found, try fetching from press-releases
    response = await fetch(
      `https://jarokilo.org.np/wp/wp-json/wp/v2/press-releases?slug=${slug}&_embed&per_page=1`
    );
    data = await response.json();
    if (data.length > 0) {
      return normalize(data[0], "प्रेस विज्ञप्ति");
    }

    return null; // Not found in either
  } catch (error) {
    console.error(`Error fetching news item with slug ${slug}:`, error);
    return null;
  }
}