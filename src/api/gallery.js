// Fetch all gallery images from programs, exclude press and books
export async function fetchGallery() {
  try {
    // Fetch "programs" only (we exclude press and books)
    const res = await fetch(
      "https://jarokilo.org.np/wp/wp-json/wp/v2/programs?_embed"
    );
    const data = await res.json();

    // Extract images from ACF fields or featured media
    return data.map((item) => {
      const acf = item.acf || {};
      return {
        id: item.id,
        title: item.title?.rendered || "Untitled",
        image_url:
          acf.picture?.url || // main ACF picture
          acf.opt_picture?.url || // optional image
          item._embedded?.["wp:featuredmedia"]?.[0]?.source_url || // fallback
          null,
      };
    }).filter(img => img.image_url); // only keep posts with image
  } catch (err) {
    console.error("Error fetching gallery:", err);
    return [];
  }
}
