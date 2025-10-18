import React, { useEffect, useState } from "react";
import { fetchGallery } from "../api/gallery";
import { useTranslation } from "react-i18next";
import SEO from "../components/SEO";

export default function GalleryPage() {
  const { t } = useTranslation();
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetchGallery().then(setImages);
  }, []);

  return (
    <>
      <SEO
        title={t("galleryPage.title")}
        description={t("galleryPage.subtitle")}
        keywords="Gallery, Jaro Kilo Foundation, Nepal, गैलरी, जरो किलो प्रतिष्ठान"
      />
      <div className="max-w-7xl mx-auto p-4 space-y-8 h-screen text-white">
        <h1 className="text-4xl font-bold text-center mb-4 animate-fadeIn bg-primary-600 rounded-xl p-2">
          {t("galleryPage.title")}
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.length === 0 ? (
            <p className="text-center col-span-full">
              {t("galleryPage.title" + " " + "common.loading")}
            </p>
          ) : (
            images.map((img) => (
              <div
                key={img.id}
                className="overflow-hidden rounded shadow hover:scale-105 transition-transform bg-gradient-to-r from-primary-700 via-primary-500 to-orange-300 p-1"
              >
                <img
                  src={img.image_url}
                  alt={img.title}
                  className="w-full h-48 object-cover"
                />
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}
