// src/api/press.js
export async function fetchPress() {
  try {
    const res = await fetch(
      "https://jarokilo.org.np/wp/wp-json/wp/v2/press-releases?_embed"
    );

    const data = await res.json();

    return data.map((item) => {
      const acf = item.acf || {};
      return {
        id: item.id,
        title: item.title?.rendered || "",
        date: item.date,
        link: item.link,
        content: item.content?.rendered || "",
        acf,
        featured_media_url:
          item._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
          acf.image_proof?.url ||
          null,
      };
    });
  } catch (err) {
    console.error("Error fetching press releases:", err);
    return [];
  }
}
