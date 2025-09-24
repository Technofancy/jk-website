export async function fetchBooks() {
  const url =
    "https://jarokilo.org.np/wp/wp-json/wp/v2/books?_fields=id,title,link,acf&per_page=20";
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`failed to fetch (${res.status})`);
    const data = await res.json();
    // each item will include `link` → use as book.link in your page
    return data;
  } catch (err) {
    console.warn("fetchBooks failed:", err);
    return []; // avoid undefined in caller
  }
}
