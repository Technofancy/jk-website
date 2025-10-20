import React, { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { fetchBooks, fetchBookBySlug } from "../api/books";
import { useTranslation } from "react-i18next";
import { FaSearch, FaBook } from "react-icons/fa";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import SEO from "../components/ui/SEO";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Loading from "../components/ui/Loading";

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

function BookDetailModal({ book, onClose, loading }) {
  const { t } = useTranslation();

  if (!book && !loading) return null;

  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-lg flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        className="bg-surface-default rounded-lg shadow-xl w-full max-w-4xl h-full max-h-[90vh] flex flex-col"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        {loading ? (
          <div className="flex-grow flex items-center justify-center">
            <Loading text={t("booksPage.loadingDetails")} />
          </div>
        ) : (
          book && (
            <>
              <div className="p-4 border-b border-border-default flex justify-between items-center flex-shrink-0">
                <h2 className="text-xl md:text-2xl font-bold text-primary-default">
                  {book.title}
                </h2>
                <Button
                  variant="ghost"
                  onClick={onClose}
                  className="text-red-500 hover:text-red-700 text-3xl"
                >
                  &times;
                </Button>
              </div>
              <div className="p-4 md:p-6 overflow-y-auto flex-grow">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-1">
                    {book.imageUrl && (
                      <img
                        src={book.imageUrl}
                        alt={book.title}
                        className="w-full h-auto object-cover rounded-lg shadow-md"
                      />
                    )}
                  </div>
                  <div className="md:col-span-2 space-y-4">
                    <p>
                      <strong>{t("booksPage.author")}:</strong> {book.author}
                    </p>
                    <p>
                      <strong>{t("booksPage.category")}:</strong>{" "}
                      {book.category}
                    </p>
                    <p>
                      <strong>{t("booksPage.pages")}:</strong> {book.pages}
                    </p>
                    <p>
                      <strong>{t("booksPage.isbn")}:</strong> {book.isbn}
                    </p>
                    {book.downloadLink && (
                      <Button
                        as="a"
                        href={book.downloadLink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {t("booksPage.download")}
                      </Button>
                    )}
                  </div>
                </div>
                <div
                  className="prose prose-lg max-w-none mt-6 text-text-secondary"
                  dangerouslySetInnerHTML={{ __html: book.content }}
                ></div>
              </div>
            </>
          )
        )}
      </motion.div>
    </div>
  );
}

export default function BooksPage() {
  const { t } = useTranslation();
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedBook, setSelectedBook] = useState(null);
  const [isModalLoading, setIsModalLoading] = useState(false);

  useEffect(() => {
    if (selectedBook || isModalLoading) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
  }, [selectedBook, isModalLoading]);

  const categories = ["All", "General", "Research", "Spiritual"];

  const deduplicate = (arr) => {
    const seen = new Set();
    return arr.filter((item) => {
      if (seen.has(item.id)) return false;
      seen.add(item.id);
      return true;
    });
  };

  const loadBooks = useCallback(
    async (nextPage = 1) => {
      if (nextPage > totalPages && totalPages > 1) {
        setHasMore(false);
        return;
      }
      setLoading(true);
      try {
        const { items: newBooks, totalPages: newTotalPages } =
          await fetchBooks(nextPage, 12);
        setTotalPages(newTotalPages);
        if (newBooks.length === 0 || nextPage >= newTotalPages) {
          setHasMore(false);
        }
        setBooks((prev) => deduplicate([...prev, ...newBooks]));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    },
    [totalPages]
  );

  useEffect(() => {
    loadBooks(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filterBooks = useCallback(() => {
    let filtered = books;

    if (searchQuery.trim()) {
      const lowercasedQuery = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (book) =>
          book.title?.toLowerCase().includes(lowercasedQuery) ||
          book.author?.toLowerCase().includes(lowercasedQuery)
      );
    }

    if (selectedCategory !== "All") {
      filtered = filtered.filter((book) => book.category === selectedCategory);
    }

    setFilteredBooks(filtered);
  }, [books, searchQuery, selectedCategory]);

  useEffect(() => {
    filterBooks();
  }, [books, searchQuery, selectedCategory, filterBooks]);

  const handleLoadMore = () => {
    if (hasMore && !loading) {
      const nextPage = page + 1;
      setPage(nextPage);
      loadBooks(nextPage);
    }
  };

  const handleCardClick = async (bookSlug) => {
    setIsModalLoading(true);
    try {
      const bookDetails = await fetchBookBySlug(bookSlug);
      setSelectedBook(bookDetails);
    } catch (error) {
      console.error("Failed to fetch book details:", error);
    } finally {
      setIsModalLoading(false);
    }
  };

  const handleCloseModal = () => {
    setSelectedBook(null);
  };

  return (
    <>
      <SEO
        title={t("books")}
        description={t("booksPage.subtitle")}
        keywords="Jaro Kilo, books, publications, Nepal"
      />
      <div className="max-w-7xl mx-auto p-4 space-y-8 text-text-default min-h-screen">
        <motion.h1
          className="text-4xl font-bold text-center mb-4 bg-primary-default text-text-on-primary rounded-xl p-2"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {t("booksPage.title")}
        </motion.h1>

        {/* Filters */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 mb-4"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="relative flex-grow">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
            <input
              type="text"
              placeholder={t("booksPage.placeholder")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="p-2 pl-10 rounded border border-border-default bg-surface-default text-text-default w-full focus:ring-2 focus:ring-primary-default"
            />
          </div>
          <div className="flex-shrink-0">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="p-2 rounded border border-border-default bg-surface-default text-text-default w-full sm:w-auto focus:ring-2 focus:ring-primary-default"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {t(`categories.${cat}`, cat)}
                </option>
              ))}
            </select>
          </div>
        </motion.div>

        {/* Content */}
        {loading && books.length === 0 ? (
          <Loading size="large" text={t("booksPage.loading")} />
        ) : (
          <>
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={sectionVariants}
              initial="hidden"
              animate="visible"
            >
              {filteredBooks.length > 0 ? (
                filteredBooks.map((book) => (
                  <motion.div
                    key={book.id}
                    variants={itemVariants}
                    onClick={() => handleCardClick(book.slug)}
                  >
                    <Card className="cursor-pointer overflow-hidden">
                      <div className="aspect-[1/1.2] w-full overflow-hidden bg-surface-subtle">
                        {book.imageUrl ? (
                          <LazyLoadImage
                            alt={book.title}
                            src={book.imageUrl}
                            effect="blur"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-primary-subtle text-primary-default">
                            <FaBook className="text-6xl" />
                          </div>
                        )}
                      </div>
                      <div className="p-4 flex flex-col flex-grow">
                        <h2 className="text-xl font-semibold mb-1 text-primary-default">
                          {book.title}
                        </h2>
                        <p className="text-sm text-text-muted mb-2">
                          {book.author}
                        </p>
                        <div
                          className="text-text-secondary line-clamp-3"
                          dangerouslySetInnerHTML={{ __html: book.excerpt }}
                        />
                      </div>
                    </Card>
                  </motion.div>
                ))
              ) : (
                <p className="text-center col-span-full">
                  {t("booksPage.noBooks")}
                </p>
              )}
            </motion.div>

            {/* Load More */}
            {hasMore && (
              <div className="text-center mt-6">
                <Button onClick={handleLoadMore} disabled={loading}>
                  {loading ? t("common.loading") : t("common.loadMore")}
                </Button>
              </div>
            )}
          </>
        )}
      </div>
      {(selectedBook || isModalLoading) && (
        <BookDetailModal
          book={selectedBook}
          onClose={handleCloseModal}
          loading={isModalLoading}
        />
      )}
    </>
  );
}