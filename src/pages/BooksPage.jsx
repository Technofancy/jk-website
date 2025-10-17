import React, { useEffect, useState, useCallback } from "react";
import { fetchBooks } from "../api/books";
import SEO from "../components/SEO";
import Loading from "../components/Loading";
import { useTranslation } from "react-i18next";

export default function BooksPage() {
  const { t } = useTranslation();
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const deduplicate = (arr) => {
    const seen = new Set();
    return arr.filter(item => {
      if (seen.has(item.id)) return false;
      seen.add(item.id);
      return true;
    });
  };

  const loadBooks = async (nextPage = 1) => {
    setLoading(true);
    try {
      const data = await fetchBooks({ per_page: 12, page: nextPage });
      if (data.length === 0) {
        setHasMore(false);
      }
      setBooks(prev => deduplicate([...prev, ...data]));
    } catch (err) {
      console.error("Failed to load books:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBooks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filterBooks = useCallback(() => {
    let filtered = books;

    if (searchQuery.trim()) {
      filtered = filtered.filter(book =>
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategory !== "all") {
      filtered = filtered.filter(book =>
        book.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    setFilteredBooks(filtered);
  }, [books, searchQuery, selectedCategory]);

  useEffect(() => {
    filterBooks();
  }, [books, searchQuery, selectedCategory, filterBooks]);

  const handleSearch = (e) => setSearchQuery(e.target.value);
  // const handleCategoryChange = (cat) => setSelectedCategory(cat);

  const handleLoadMore = () => {
    if (hasMore && !loading) {
      const nextPage = page + 1;
      setPage(nextPage);
      loadBooks(nextPage);
    }
  };

  return (
    <>
      <SEO title="Books" description="Books library" keywords="Books, Publications" />

      <div className="space-y-8 max-w-7xl mx-auto px-4 pb-2">
        <section className="text-white bg-gradient-to-r from-primary-700 via-primary-500 to-orange-300 py-16 text-center rounded-lg">
          <h1 className="text-5xl font-bold mb-4">{t("books.title")}</h1>
          <p className="text-xl">{t("books.subtitle")}</p>
        </section>

        <div className="rounded-md place-self-center border-l-2 border-secondary-500">
          <input
            type="text"
            placeholder={t("books.placeholder")}
            value={searchQuery}
            onChange={handleSearch}
            className="px-4 py-2 border border-gray-300 rounded focus:ring-1 focus:ring-secondary-500 focus:border-transparent"
          />
          {/* Category buttons */}
          {/* <div className="flex gap-2 flex-wrap">
            {["all", "education", "culture", "technology", "research", "general"].map(cat => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`px-4 py-2 rounded font-medium ${
                  selectedCategory === cat ? "bg-red-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div> */}
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBooks.map(book => (
            <div
              key={book.id}
              onClick={() => setSelectedBook(book)}
              className="cursor-pointer bg-white rounded shadow hover:shadow-lg transition-transform transform hover:scale-105 overflow-hidden"
            >
              <div className="aspect-[3/4] bg-gray-200">
                {book.imageUrl ? (
                  <img src={book.imageUrl} alt={book.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-primary-100 text-primary-300 text-6xl">📖</div>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg line-clamp-2">{book.title}</h3>
                <p className="text-primary-600 text-sm">{book.author}</p>
                <p className="text-gray-600 text-sm line-clamp-3">{book.excerpt || "No description available"}</p>
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>{book.formattedDate}</span>
                  {book.pages && <span>{book.pages} pages</span>}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load more */}
        {hasMore && (
          <div className="text-center mt-6">
            <button
              onClick={handleLoadMore}
              className="px-6 py-2 bg-primary-600 text-white rounded hover:bg-primary-700 transition-colors"
            >
              {loading ? t("common.loading") : t("common.loadMore")}
            </button>
          </div>
        )}

        {loading && books.length === 0 && <Loading size="large" text="Loading books..." />}
      </div>

      {/* Modal */}
      {selectedBook && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6 relative">
            <button
              onClick={() => setSelectedBook(null)}
              className="absolute top-4 right-4 text-gray-600 text-xl font-bold hover:text-gray-800"
            >
              &times;
            </button>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {selectedBook.imageUrl && (
                <img src={selectedBook.imageUrl} alt={selectedBook.title} className="w-full h-full object-cover rounded" />
              )}
              <div className="space-y-4">
                <h2 className="text-3xl font-bold">{selectedBook.title}</h2>
                <p className="text-primary-600 font-medium">{selectedBook.author}</p>
                <div dangerouslySetInnerHTML={{ __html: selectedBook.content || selectedBook.excerpt }} />
                {selectedBook.downloadUrl && (
                  <a href={selectedBook.downloadUrl} target="_blank" className="bg-primary-600 text-gray-300 px-6 py-2 rounded hover:bg-primary-700">
                    Download PDF
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
