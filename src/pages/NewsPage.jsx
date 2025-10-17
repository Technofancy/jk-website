import React, { useState, useEffect, useCallback } from "react";
import { fetchNews } from "../api/news"; // Import fetchNews from news.js
// Remove individual fetchPress and fetchPrograms imports
import { useTranslation } from "react-i18next";

export default function NewsPage() {
  const { t } = useTranslation();
  const perPage = 6;
  const [items, setItems] = useState([]);
  const [displayedItems, setDisplayedItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);

  const loadItems = async () => {
    setLoading(true);
    try {
      // Use the fetchNews function which already handles fetching, normalizing, and sorting
      const allItems = await fetchNews(); 
      setItems(allItems);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadItems();
  }, []);

  const filteredItems = useCallback(() => {
    if (!searchQuery.trim()) return items;
    return items.filter(
      item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.content.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [items, searchQuery]);

  useEffect(() => {
    setDisplayedItems(filteredItems().slice(0, perPage * page));
  }, [filteredItems, page]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop + 50 >=
        document.documentElement.scrollHeight
      ) {
        if (perPage * page < filteredItems().length) {
          setPage(prev => prev + 1);
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [page, filteredItems]);

  return (
    <div className="max-w-7xl mx-auto p-4 space-y-8 text-white pb-6">
      <h1 className="text-4xl font-bold text-center mb-4 animate-fadeIn bg-primary-600 rounded-xl p-2">
        {t("news.title")}
      </h1>

      <div className="mb-4 place-self-center border-l-2 border-secondary-500 rounded-md">
        <input
          type="text"
          placeholder={t("news.placeholder")}
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="p-2 rounded border border-gray-300 text-black"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading
          ? t("news.loading")
          : displayedItems.length === 0
          ? t("news.noNews")
          : displayedItems.map(item => (
              <div
                key={item.id}
                className="cursor-pointer bg-gradient-to-r from-primary-700 via-primary-500 to-orange-300 rounded shadow p-4 hover:shadow-lg transition-transform transform hover:scale-105"
                onClick={() => setSelectedItem(item)}
              >
                <h2 className="text-xl font-semibold mb-1">{item.title}</h2>
                <p className="text-gray-300 text-sm mb-2">
                  {item.date && !isNaN(new Date(item.date).getTime())
                    ? new Date(item.date).toLocaleDateString()
                    : "Date N/A"}
                </p>
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full object-cover rounded mb-2 max-h-64"
                  />
                )}
                <div className="text-gray-200 line-clamp-3">{item.content}</div>
              </div>
            ))}
      </div>

      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 p-4">
          <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 relative">
            <button
              className="absolute top-3 right-3 text-primary-500 text-2xl font-bold hover:text-primary-700"
              onClick={() => setSelectedItem(null)}
            >
              &times;
            </button>
            <h2 className="text-2xl text-gray-700 font-bold mb-2">{selectedItem.title}</h2>
            <p className="text-gray-600 text-sm mb-4">
              {selectedItem.date && !isNaN(new Date(selectedItem.date).getTime())
                ? new Date(selectedItem.date).toLocaleDateString()
                : "Date N/A"}
            </p>
            {selectedItem.image && (
              <img
                src={selectedItem.image}
                alt={selectedItem.title}
                className="w-full mb-4 object-cover rounded"
              />
            )}
            <div className="text-gray-900 whitespace-pre-wrap">{selectedItem.content}</div>
          </div>
        </div>
      )}
    </div>
  );
}