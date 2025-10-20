import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { fetchPrograms, fetchProgramBySlug } from "../api/programs";
import { useTranslation } from "react-i18next";
import { FaSearch, FaCalendarAlt } from "react-icons/fa";
import SEO from "../components/ui/SEO";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Loading from "../components/ui/Loading";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

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

function ProgramDetailModal({ item, onClose, loading }) {
  const { t } = useTranslation();

  if (!item && !loading) return null;

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
            <Loading text={t("programsPage.loadingDetails")} />
          </div>
        ) : (
          item && (
            <>
              <div className="p-4 border-b border-border-default flex justify-between items-center flex-shrink-0">
                <h2 className="text-xl md:text-2xl font-bold text-primary-default">
                  {item.acf?.program_heading}
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
                {item.acf?.picture?.url && (
                  <LazyLoadImage
                    src={item.acf.picture.url}
                    alt={item.acf?.program_heading}
                    effect="blur"
                    className="w-full h-auto object-cover rounded-lg shadow-md mb-6"
                  />
                )}
                <p className="text-secondary-default text-sm mb-4">
                  <strong>{t("programsPage.date")}:</strong>{" "}
                  {item.acf?.start_date} - {item.acf?.end_date}
                </p>
                <div
                  className="prose prose-lg max-w-none text-text-secondary"
                  dangerouslySetInnerHTML={{ __html: item.acf?.text_contents }}
                ></div>
              </div>
            </>
          )
        )}
      </motion.div>
    </div>
  );
}

export default function ProgramsPage() {
  const { t } = useTranslation();
  const [programs, setPrograms] = useState([]);
  const [filteredPrograms, setFilteredPrograms] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalLoading, setIsModalLoading] = useState(false);

  useEffect(() => {
    if (selectedItem || isModalLoading) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
  }, [selectedItem, isModalLoading]);

  const deduplicate = (arr) => {
    const seen = new Set();
    return arr.filter((item) => {
      if (seen.has(item.id)) return false;
      seen.add(item.id);
      return true;
    });
  };

  const loadPrograms = useCallback(
    async (nextPage = 1) => {
      if (nextPage > totalPages && totalPages > 1) {
        setHasMore(false);
        return;
      }
      setLoading(true);
      try {
        const { items: data, totalPages: newTotalPages } = await fetchPrograms(
          nextPage,
          6
        );
        setTotalPages(newTotalPages);
        if (data.length === 0 || nextPage >= newTotalPages) {
          setHasMore(false);
        }
        setPrograms((prev) => deduplicate([...prev, ...data]));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    },
    [totalPages]
  );

  useEffect(() => {
    loadPrograms(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filterPrograms = useCallback(() => {
    let filtered = programs;
    if (searchQuery.trim()) {
      filtered = programs.filter(
        (item) =>
          item.acf?.program_heading
            ?.toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          item.acf?.text_contents
            ?.toLowerCase()
            .includes(searchQuery.toLowerCase())
      );
    }
    setFilteredPrograms(filtered);
  }, [programs, searchQuery]);

  useEffect(() => {
    filterPrograms();
  }, [programs, searchQuery, filterPrograms]);

  const handleLoadMore = () => {
    if (hasMore && !loading) {
      const nextPage = page + 1;
      setPage(nextPage);
      loadPrograms(nextPage);
    }
  };

  const handleCardClick = async (slug) => {
    setIsModalLoading(true);
    try {
      const itemDetails = await fetchProgramBySlug(slug);
      setSelectedItem(itemDetails);
    } catch (error) {
      console.error("Failed to fetch program details:", error);
    } finally {
      setIsModalLoading(false);
    }
  };

  const handleCloseModal = () => {
    setSelectedItem(null);
  };

  return (
    <>
      <SEO
        title={t("programs")}
        description={t("programsPage.subtitle")}
        keywords="Jaro Kilo Foundation, programs, कार्यक्रम, Nepal"
      />
      <div className="max-w-7xl mx-auto p-4 space-y-8 text-text-default min-h-screen">
        <motion.h1
          className="text-4xl font-bold text-center mb-4 bg-primary-default text-text-on-primary rounded-xl p-2"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {t("programsPage.title")}
        </motion.h1>

        <motion.div
          className="mb-4 relative"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
          <input
            type="text"
            placeholder={t("programsPage.placeholder")}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="p-2 pl-10 rounded border border-border-default bg-surface-default text-text-default w-full focus:ring-2 focus:ring-primary-default"
          />
        </motion.div>

        {loading && programs.length === 0 ? (
          <Loading size="large" text={t("programsPage.loading")} />
        ) : (
          <>
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={sectionVariants}
              initial="hidden"
              animate="visible"
            >
              {filteredPrograms.length > 0 ? (
                filteredPrograms.map((item) => (
                  <motion.div
                    key={item.id}
                    variants={itemVariants}
                    onClick={() => handleCardClick(item.slug)}
                  >
                    <Card className="cursor-pointer overflow-hidden">
                      <div className="aspect-[16/9] w-full overflow-hidden bg-surface-subtle">
                        {item.acf?.picture?.url ? (
                          <LazyLoadImage
                            src={item.acf.picture.url}
                            alt={item.acf?.program_heading}
                            effect="blur"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-primary-subtle text-primary-default">
                            <FaCalendarAlt className="text-6xl" />
                          </div>
                        )}
                      </div>
                      <div className="p-4 flex flex-col flex-grow">
                        <h3 className="font-bold text-lg line-clamp-2 text-primary-default">
                          {item.acf?.program_heading}
                        </h3>
                        <p className="text-text-muted text-sm mb-2">
                          {item.acf?.start_date}
                        </p>
                        <div
                          className="text-text-secondary line-clamp-3"
                          dangerouslySetInnerHTML={{
                            __html: item.acf?.text_contents,
                          }}
                        ></div>
                      </div>
                    </Card>
                  </motion.div>
                ))
              ) : (
                <p className="text-center col-span-full">
                  {t("programsPage.noPrograms")}
                </p>
              )}
            </motion.div>

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
      {(selectedItem || isModalLoading) && (
        <ProgramDetailModal
          item={selectedItem}
          onClose={handleCloseModal}
          loading={isModalLoading}
        />
      )}
    </>
  );
}