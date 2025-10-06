import React, { useEffect, useState } from "react";
import { fetchGallery } from "../api/gallery";

export default function GalleryPage() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetchGallery().then(setImages);
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-4 space-y-8 h-screen text-white">
      <h1 className="text-4xl font-bold text-center mb-4 animate-fadeIn bg-red-600 rounded-xl p-2">
        संग्रह (ग्यालरी)
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.length === 0 ? (
          <p className="text-center col-span-full">ग्यालरी खुल्दैछ...</p>
        ) : (
          images.map((img) => (
            <div
              key={img.id}
              className="overflow-hidden rounded shadow hover:scale-105 transition-transform bg-gradient-to-r from-red-700 via-red-500 to-orange-300 p-2"
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
  );
}
