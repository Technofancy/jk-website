import React, { useEffect, useState } from "react";
import { fetchPress } from "../api/press";

export default function PressReleasePage() {
  const [press, setPress] = useState([]);
  const [selectedPress, setSelectedPress] = useState(null); // for modal

  useEffect(() => {
    fetchPress().then(setPress);
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-4 space-y-8 text-white h-screen">
      <h1 className="text-4xl font-bold text-center mb-4 animate-fadeIn bg-red-600 rounded-xl p-2">
        प्रेस विज्ञप्ति
      </h1>

      {/* Press cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {press.length === 0 ? (
          <p className="text-center col-span-full">प्रेस विज्ञप्ति खुल्दैछ...</p>
        ) : (
          press.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedPress(item)}
              className="cursor-pointer bg-gradient-to-r from-red-700 via-red-500 to-orange-300 rounded shadow p-4 hover:shadow-lg transition-transform transform hover:scale-105"
              data-aos="fade-up"
            >
              <h2 className="text-2xl font-semibold mb-1">
                {item.title?.rendered || "Untitled"}
              </h2>
              <p className="text-gray-600 text-sm mb-2">
                {new Date(item.date).toLocaleDateString()} | {item.acf?.author || "Unknown"}
              </p>
              <div
                dangerouslySetInnerHTML={{
                  __html:
                    item.content?.rendered
                      ? item.content.rendered.slice(0, 100) + "..."
                      : "No preview available",
                }}
              ></div>
            </div>
          ))
        )}
      </div>

      {/* Modal for full view */}
      {selectedPress && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 p-4">
          <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 relative">
            <button
              onClick={() => setSelectedPress(null)}
              className="absolute top-3 right-3 text-red-500 text-2xl font-bold hover:text-red-700"
            >
              &times;
            </button>
            <h2 className="text-3xl font-bold mb-2">
              {selectedPress.title?.rendered || "Untitled"}
            </h2>
            <p className="text-gray-600 text-sm mb-4">
              {new Date(selectedPress.date).toLocaleDateString()} | {selectedPress.acf?.author || "Unknown"}
            </p>
            {selectedPress.acf?.image_proof?.url && (
              <img
                src={selectedPress.acf.image_proof.url}
                alt={selectedPress.title?.rendered}
                className="w-full mb-4 object-cover rounded"
              />
            )}
            <div
              dangerouslySetInnerHTML={{
                __html: selectedPress.content?.rendered || selectedPress.acf?.full_content || "No content available",
              }}
            ></div>
            {selectedPress.acf?.external_links && (
              <a
                href={selectedPress.acf.external_links}
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
