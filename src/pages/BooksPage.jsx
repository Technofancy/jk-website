import React, { useEffect, useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { fetchBooks } from "../api/books";
import SEO from "../components/SEO";
import Loading from "../components/Loading";

export default function BooksPage() {
  const { t } = useTranslation();
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [error, setError] = useState(null);

  const categories = ["all", "education", "culture", "technology", "research", "general"];

  const filterBooks = useCallback(() => {
    let filtered = books;

    // Filter by search query
    if (searchQuery.trim()) {
      filtered = filtered.filter(book =>
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter(book =>
        book.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    setFilteredBooks(filtered);
  }, [books, searchQuery, selectedCategory]);

  const loadBooks = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchBooks();
      setBooks(data);
    } catch (err) {
      setError("Failed to load books. Please try again later.");
      console.error("Error loading books:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBooks();
  }, []);

  useEffect(() => {
    filterBooks();
  }, [filterBooks]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  if (loading) {
    return <Loading size="large" text={t("common.loading")} />;
  }

  return (
    <>
      <SEO 
        title={t("books.title")}
        description={t("books.subtitle")}
        keywords="Books, Publications, Jaro Kilo Foundation, Nepal, पुस्तकहरू, प्रकाशन"
      />
      
      <div className="space-y-8">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-red-700 via-red-500 to-orange-300  text-white py-16 transition-colors duration-100">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <h1 className="text-5xl font-bold mb-4" data-aos="fade-up">
              {t("books.title")}
            </h1>
            <p className="text-xl max-w-3xl mx-auto" data-aos="fade-up" data-aos-delay="200">
              {t("books.subtitle")}
            </p>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-6">
          {/* Search and Filter Section */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg mb-8 transition-colors duration-300" data-aos="fade-up">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              {/* Search Bar */}
              <div className="flex-1 max-w-md">
                <input
                  type="text"
                  placeholder={t("common.search") + " books..."}
                  value={searchQuery}
                  onChange={handleSearch}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>

              {/* Category Filter */}
              {/* <div className="flex flex-wrap gap-2">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => handleCategoryChange(category)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      selectedCategory === category
                        ? "bg-red-600 text-white"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </button>
                ))}
              </div> */}
            </div>

            {/* Results Count */}
            <div className="mt-4 text-sm text-gray-600">
              {filteredBooks.length} {filteredBooks.length === 1 ? 'book' : 'books'} found
            </div>
          </div>

          {/* Error State */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-8">
              {error}
              <button 
                onClick={loadBooks}
                className="ml-4 text-red-600 hover:text-red-800 underline"
              >
                {t("common.retry")}
              </button>
            </div>
          )}

          {/* Books Grid */}
          {filteredBooks.length === 0 && !loading ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">📚</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                {searchQuery || selectedCategory !== "all" ? "No books found" : t("books.noBooks")}
              </h3>
              <p className="text-gray-600">
                {searchQuery || selectedCategory !== "all" 
                  ? "Try adjusting your search or filter criteria"
                  : "Please check back later for new publications"
                }
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredBooks.map((book, index) => (
                <div
                  key={book.id}
                  onClick={() => setSelectedBook(book)}
                  className="cursor-pointer bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 overflow-hidden"
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  {/* Book Cover */}
                  <div className="aspect-[3/4] bg-gray-200 relative overflow-hidden">
                    {book.imageUrl ? (
                      <img
                        src={book.imageUrl}
                        alt={book.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-red-100 to-orange-100">
                        <div className="text-6xl text-red-300">📖</div>
                      </div>
                    )}
                    
                    {/* Category Badge */}
                    <div className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded text-xs font-medium">
                      {book.category}
                    </div>
                  </div>

                  {/* Book Info */}
                  <div className="p-4">
                    <h3 className="font-bold text-lg mb-2 line-clamp-2 text-gray-800">
                      {book.title}
                    </h3>
                    <p className="text-red-600 font-medium text-sm mb-2">
                      {book.author}
                    </p>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                      {book.excerpt || "No description available"}
                    </p>
                    <div className="flex justify-between items-center text-xs text-gray-500">
                      <span>{book.formattedDate}</span>
                      {book.pages && <span>{book.pages} pages</span>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Book Detail Modal */}
        {selectedBook && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 p-4">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto relative">
              <button
                onClick={() => setSelectedBook(null)}
                className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors"
              >
                <span className="text-gray-600 text-xl">✕</span>
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
                {/* Book Cover */}
                <div className="aspect-[3/4] bg-gray-200 rounded-lg overflow-hidden">
                  {selectedBook.imageUrl ? (
                    <img
                      src={selectedBook.imageUrl}
                      alt={selectedBook.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-red-100 to-orange-100">
                      <div className="text-8xl text-red-300">📖</div>
                    </div>
                  )}
                </div>

                {/* Book Details */}
                <div className="space-y-4">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">
                      {selectedBook.title}
                    </h2>
                    <p className="text-xl text-red-600 font-medium">
                      {selectedBook.author}
                    </p>
                  </div>

                  {/* Book Metadata */}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    {selectedBook.publisher && (
                      <div>
                        <span className="font-medium text-gray-700">Publisher:</span>
                        <p className="text-gray-600">{selectedBook.publisher}</p>
                      </div>
                    )}
                    {selectedBook.publicationYear && (
                      <div>
                        <span className="font-medium text-gray-700">Year:</span>
                        <p className="text-gray-600">{selectedBook.publicationYear}</p>
                      </div>
                    )}
                    {selectedBook.pages && (
                      <div>
                        <span className="font-medium text-gray-700">Pages:</span>
                        <p className="text-gray-600">{selectedBook.pages}</p>
                      </div>
                    )}
                    {selectedBook.language && (
                      <div>
                        <span className="font-medium text-gray-700">Language:</span>
                        <p className="text-gray-600">{selectedBook.language}</p>
                      </div>
                    )}
                    {selectedBook.isbn && (
                      <div className="col-span-2">
                        <span className="font-medium text-gray-700">ISBN:</span>
                        <p className="text-gray-600">{selectedBook.isbn}</p>
                      </div>
                    )}
                  </div>

                  {/* Description */}
                  <div>
                    <h3 className="font-bold text-lg mb-2">Description</h3>
                    <div 
                      className="text-gray-600 leading-relaxed prose max-w-none"
                      dangerouslySetInnerHTML={{ 
                        __html: selectedBook.content || selectedBook.excerpt || "No description available" 
                      }}
                    />
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-4">
                    {selectedBook.downloadUrl && (
                      <a
                        href={selectedBook.downloadUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
                      >
                        Download PDF
                      </a>
                    )}
                    {selectedBook.externalLink && (
                      <a
                        href={selectedBook.externalLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="border border-red-600 text-red-600 px-6 py-2 rounded-lg hover:bg-red-50 transition-colors"
                      >
                        View Online
                      </a>
                    )}
                    {selectedBook.link && (
                      <a
                        href={selectedBook.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="border border-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        More Details
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
