import React, { useEffect, useState } from "react";
import { fetchNews } from "../api/news"; // API fetch for programs + press

export default function NewsPage() {
  const [news, setNews] = useState([]);
  const [selectedNews, setSelectedNews] = useState(null); // modal

  useEffect(() => {
    fetchNews().then(setNews);
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-4 space-y-8">
      <h1 className="text-4xl font-bold text-center mb-4 animate-fadeIn bg-red-500 rounded-xl p-2">
        आद्यावधिक समाचार
      </h1>

      {/* News cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {news.length === 0 ? (
          <p className="text-center col-span-full">समाचार खुल्दैछ...</p>
        ) : (
          news.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedNews(item)}
              className="cursor-pointer bg-gradient-to-r from-red-500 via-red-300 to-orange-100 rounded shadow p-4 hover:shadow-lg transition-transform transform hover:scale-105"
              data-aos="fade-up"
            >
              {item.featured_media_url && (
                <img
                  src={item.featured_media_url}
                  alt={item.title?.rendered || "News Image"}
                  className="w-full h-48 object-cover mb-2 rounded"
                />
              )}
              <h2 className="text-xl font-semibold mb-1">{item.title?.rendered || "Untitled"}</h2>
              <p className="text-gray-600 text-sm mb-2">
                {item.type?.toUpperCase()} | {new Date(item.date).toLocaleDateString()}
              </p>
              <div
                dangerouslySetInnerHTML={{
                  __html: item.excerpt?.rendered
                    ? item.excerpt.rendered.slice(0, 100) + "..."
                    : "No preview available",
                }}
              ></div>
            </div>
          ))
        )}
      </div>

      {/* Modal for full news */}
      {selectedNews && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 p-4">
          <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 relative">
            <button
              onClick={() => setSelectedNews(null)}
              className="absolute top-3 right-3 text-red-500 text-2xl font-bold hover:text-red-700"
            >
              &times;
            </button>
            <h2 className="text-3xl font-bold mb-2">{selectedNews.title?.rendered || "Untitled"}</h2>
            <p className="text-gray-600 text-sm mb-4">
              {selectedNews.type?.toUpperCase()} | {new Date(selectedNews.date).toLocaleDateString()}
            </p>
            {selectedNews.featured_media_url && (
              <img
                src={selectedNews.featured_media_url}
                alt={selectedNews.title?.rendered || "News Image"}
                className="w-full mb-4 object-cover rounded"
              />
            )}
            <div
              dangerouslySetInnerHTML={{
                __html: selectedNews.content?.rendered || selectedNews.acf?.full_content || "No content available",
              }}
            ></div>
            {selectedNews.acf?.external_links && (
              <a
                href={selectedNews.acf.external_links}
                target="_blank"
                className="mt-4 inline-block text-blue-600 hover:underline"
              >
                External Link
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
