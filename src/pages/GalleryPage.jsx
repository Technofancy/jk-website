import React, { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { fetchGallery } from "../api/gallery";
import { useTranslation } from "react-i18next";
import { FaImage } from "react-icons/fa";
import SEO from "../components/ui/SEO";
import Card from "../components/ui/Card";
import Loading from "../components/ui/Loading";
import Button from "../components/ui/Button";
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

function ImageDetailModal({ image, onClose }) {
  if (!image) return null;

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
        <div className="p-4 border-b border-border-default flex justify-between items-center flex-shrink-0">
          <h2 className="text-xl md:text-2xl font-bold text-primary-default">
            {image.title}
          </h2>
          <Button
            variant="ghost"
            onClick={onClose}
            className="text-red-500 hover:text-red-700 text-3xl"
          >
            &times;
          </Button>
        </div>
        <div className="p-4 md:p-6 overflow-y-auto flex-grow flex items-center justify-center">
          <LazyLoadImage
            src={image.url}
            alt={image.alt}
            effect="blur"
            className="max-w-full max-h-full object-contain"
          />
        </div>
      </motion.div>
    </div>
  );
}

export default function GalleryPage() {
  const { t } = useTranslation();
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (selectedImage) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
  }, [selectedImage]);

  const deduplicate = (arr) => {
    const seen = new Set();
    return arr.filter((item) => {
      if (seen.has(item.id)) return false;
      seen.add(item.id);
      return true;
    });
  };

  const loadImages = useCallback(async (nextPage = 1) => {
    if (nextPage > totalPages && totalPages > 1) {
      setHasMore(false);
      return;
    }
    setLoading(true);
    try {
      const { items: data, totalPages: newTotalPages } = await fetchGallery(
        nextPage,
        12
      );
      setTotalPages(newTotalPages);
      if (data.length === 0 || nextPage >= newTotalPages) {
        setHasMore(false);
      }
      setImages((prev) => deduplicate([...prev, ...data]));
    } catch (err) {
      console.error("Failed to load gallery:", err);
    } finally {
      setLoading(false);
    }
  }, [totalPages]);

  useEffect(() => {
    loadImages(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLoadMore = () => {
    if (hasMore && !loading) {
      const nextPage = page + 1;
      setPage(nextPage);
      loadImages(nextPage);
    }
  };

  return (
    <>
      <SEO
        title={t("gallery")}
        description={t("galleryPage.subtitle")}
        keywords="Gallery, Jaro Kilo Foundation, Nepal, गैलरी, जरो किलो प्रतिष्ठान"
      />
      <div className="max-w-7xl mx-auto p-4 space-y-8 min-h-screen text-text-default pb-6">
        <motion.section
          className="text-text-on-primary bg-primary-default py-16 text-center rounded-lg"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-5xl font-bold mb-4">
            {t("galleryPage.title")}
          </h1>
          <p className="text-xl">{t("galleryPage.subtitle")}</p>
        </motion.section>

        {loading && images.length === 0 ? (
          <Loading size="large" text={t("common.loading")} />
        ) : (
          <>
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
              variants={sectionVariants}
              initial="hidden"
              animate="visible"
            >
              {images.length > 0 ? (
                images.map((img) => (
                  <motion.div
                    key={img.id}
                    variants={itemVariants}
                    onClick={() => setSelectedImage(img)}
                  >
                    <Card className="overflow-hidden cursor-pointer">
                      <div className="aspect-square">
                        {img.url ? (
                          <LazyLoadImage
                            src={img.url}
                            alt={img.alt}
                            effect="blur"
                            className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-primary-subtle text-primary-default">
                            <FaImage className="text-6xl" />
                          </div>
                        )}
                      </div>
                    </Card>
                  </motion.div>
                ))
              ) : (
                <p className="text-center col-span-full">
                  {t("galleryPage.noImages")}
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
      {selectedImage && (
        <ImageDetailModal
          image={selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </>
  );
}