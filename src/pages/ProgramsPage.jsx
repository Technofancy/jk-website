import React, { useState, useEffect, useCallback } from "react";
import { fetchPrograms } from "../api/programs";
import { useTranslation } from "react-i18next";

export default function ProgramsPage() {
  const { t } = useTranslation();
  const perPage = 6;
  const [programs, setPrograms] = useState([]);
  const [displayedItems, setDisplayedItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [selectedProgram, setSelectedProgram] = useState(null);

  const loadPrograms = async () => {
    setLoading(true);
    try {
      const { items } = await fetchPrograms(); // Destructure to get items
      const unique = Array.from(new Map(items.map(item => [item.id, item])).values());
      setPrograms(unique);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPrograms();
  }, []);

  const filteredItems = useCallback(() => {
    if (!searchQuery.trim()) return programs;
    return programs.filter(
      item =>
        item.acf?.program_heading?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.acf?.text_contents?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [programs, searchQuery]);

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
    <div className="max-w-7xl mx-auto p-4 space-y-8 text-white">
      <h1 className="text-4xl font-bold text-center mb-4 animate-fadeIn bg-primary-600 rounded-xl p-2">
        {t("programs.title")}
      </h1>

      <div className="mb-4 place-self-center border-l-2 border-secondary-500 rounded-md">
        <input
          type="text"
          placeholder={t("programs.placeholder")}
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="p-2 rounded border border-gray-300 text-black"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading
          ? "Loading..."
          : displayedItems.length === 0
          ? "No programs found"
          : displayedItems.map(item => (
              <div
                key={item.id}
                className="cursor-pointer bg-gradient-to-r from-red-700 via-red-500 to-orange-300 rounded shadow p-4 hover:shadow-lg transition-transform transform hover:scale-105"
                onClick={() => setSelectedProgram(item)}
              >
                <h2 className="text-xl font-semibold mb-1">{item.acf?.program_heading}</h2>
                <p className="text-gray-300 text-sm mb-2">{item.acf?.start_date}</p>
                {item.acf?.picture?.url && (
                  <img
                    src={item.acf.picture.url}
                    alt={item.acf?.program_heading}
                    className="w-full object-cover rounded mb-2 max-h-64"
                  />
                )}
                <div className="text-gray-200 line-clamp-3">{item.acf?.text_contents}</div>
              </div>
            ))}
      </div>

      {selectedProgram && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 p-4">
          <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 relative">
            <button
              className="absolute top-3 right-3 text-primary-500 text-2xl font-bold hover:text-primary-700"
              onClick={() => setSelectedProgram(null)}
            >
              &times;
            </button>
            <h2 className="text-2xl text-gray-700 font-bold mb-2">{selectedProgram.acf?.program_heading}</h2>
            <p className="text-gray-600 text-sm mb-4">{selectedProgram.acf?.start_date}</p>
            {selectedProgram.acf?.picture?.url && (
              <img
                src={selectedProgram.acf.picture.url}
                alt={selectedProgram.acf?.program_heading}
                className="w-full mb-4 object-cover rounded"
              />
            )}
            <div className="text-gray-900 whitespace-pre-wrap">{selectedProgram.acf?.text_contents}</div>
          </div>
        </div>
      )}
    </div>
  );
}