import React, { useState, useEffect, useCallback } from "react";
import { fetchPress } from "../api/press";
import { useTranslation } from "react-i18next";

export default function PressReleasePage() {
  const { t } = useTranslation();
  const perPage = 6; // items per load
  const [pressItems, setPressItems] = useState([]);
  const [displayedItems, setDisplayedItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [selectedPress, setSelectedPress] = useState(null);

  // Fetch all press items
  const loadPress = async () => {
    setLoading(true);
    try {
      const { items } = await fetchPress(); // Destructure to get items
      // deduplicate by ID
      const unique = Array.from(new Map(items.map(item => [item.id, item])).values());
      setPressItems(unique);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPress();
  }, []);

  // Filtered items by search query
  const filteredItems = useCallback(() => {
    if (!searchQuery.trim()) return pressItems;
    return pressItems.filter(
      (item) =>
        item.acf?.subject?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.acf?.full_content?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [pressItems, searchQuery]);

  // Update displayed items whenever page or filteredItems changes
  useEffect(() => {
    setDisplayedItems(filteredItems().slice(0, perPage * page));
  }, [filteredItems, page]);

  // Infinite scroll
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop + 50 >=
        document.documentElement.scrollHeight
      ) {
        if (perPage * page < filteredItems().length) {
          setPage((prev) => prev + 1);
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [page, filteredItems]);

  return (
    <div className="max-w-7xl mx-auto p-4 space-y-8 text-white">
      <h1 className="text-4xl font-bold text-center mb-4 animate-fadeIn bg-red-600 rounded-xl p-2">
        प्रेस विज्ञप्ति
      </h1>

      {/* Search */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search press..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full md:w-1/2 p-2 rounded border border-gray-300 text-black"
        />
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading
          ? "Loading..."
          : displayedItems.length === 0
          ? "No press releases found"
          : displayedItems.map((item) => (
              <div
                key={item.id}
                className="cursor-pointer bg-gradient-to-r from-red-700 via-red-500 to-orange-300 rounded shadow p-4 hover:shadow-lg transition-transform transform hover:scale-105"
                onClick={() => setSelectedPress(item)}
              >
                <h2 className="text-xl font-semibold mb-1">{item.acf?.subject}</h2>
                <p className="text-gray-300 text-sm mb-2">{item.acf?.date}</p>
                {item.acf?.image_proof?.url && (
                  <img
                    src={item.acf.image_proof.url}
                    alt={item.acf?.subject}
                    className="w-full object-cover rounded mb-2 max-h-64"
                  />
                )}
                <div className="text-gray-200 line-clamp-3">
                  {item.acf?.full_content}
                </div>
              </div>
            ))}
      </div>

      {/* Modal */}
      {selectedPress && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 p-4">
          <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 relative">
            <button
              className="absolute top-3 right-3 text-red-500 text-2xl font-bold hover:text-red-700"
              onClick={() => setSelectedPress(null)}
            >
              &times;
            </button>
            <h2 className="text-2xl text-gray-700 font-bold mb-2">{selectedPress.acf?.subject}</h2>
            <p className="text-gray-600 text-sm mb-4">{selectedPress.acf?.date}</p>
            {selectedPress.acf?.image_proof?.url && (
              <img
                src={selectedPress.acf.image_proof.url}
                alt={selectedPress.acf?.subject}
                className="w-full mb-4 object-cover rounded"
              />
            )}
            <div className="text-gray-900 whitespace-pre-wrap">{selectedPress.acf?.full_content}</div>
          </div>
        </div>
      )}
    </div>
  );
}