import React, { useEffect, useState } from "react";
import { fetchPrograms } from "../api/programs";

export default function ProgramsPage() {
  const [programs, setPrograms] = useState([]);
  const [selectedProgram, setSelectedProgram] = useState(null); // for modal

  useEffect(() => {
    fetchPrograms().then(setPrograms);
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-4 space-y-8">
      <h1 className="text-4xl font-bold text-center mb-4 animate-fadeIn bg-red-500 rounded-xl p-2">
        हाम्रा कार्यक्रमहरु
      </h1>

      {/* Grid of cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {programs.length === 0 ? (
          <p className="text-center col-span-full">कार्यक्रमहरु खुल्दैछ...</p>
        ) : (
          programs.map((p) => (
            <div
              key={p.id}
              onClick={() => setSelectedProgram(p)} // open modal
              className="cursor-pointer bg-gradient-to-r from-red-500 via-red-300 to-orange-100 rounded shadow p-4 hover:shadow-lg transition-transform transform hover:scale-105"
              data-aos="fade-up"
            >
              <h2 className="text-xl font-semibold mb-2">{p.title.rendered}</h2>
              <p className="text-gray-700 mb-2">{p.acf?.description}</p>
              <a
                href={p.link}
                className="text-blue-600 hover:underline"
                target="_blank"
                onClick={(e) => e.stopPropagation()} // prevent modal opening
              >
                ...पुरा पढ्नुहोस्
              </a>
            </div>
          ))
        )}
      </div>

      {/* Modal */}
      {selectedProgram && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-3xl w-full overflow-y-auto max-h-full p-6 relative">
            {/* Close button */}
            <button
              className="absolute top-4 right-4 text-red-500 font-bold text-xl"
              onClick={() => setSelectedProgram(null)}
            >
              &times;
            </button>

            {/* Modal content */}
            <h2 className="text-2xl font-bold mb-4">{selectedProgram.title.rendered}</h2>

            {selectedProgram.acf?.picture?.url && (
              <img
                src={selectedProgram.acf.picture.url}
                alt={selectedProgram.title.rendered}
                className="w-full max-h-96 object-cover rounded mb-4"
              />
            )}

            <p className="text-gray-700 mb-4">{selectedProgram.acf?.description}</p>

            {selectedProgram.acf?.text_contents && (
              <div className="text-gray-600" dangerouslySetInnerHTML={{ __html: selectedProgram.acf.text_contents.replace(/\r\n/g, "<br/>") }}></div>
            )}

            <a
              href={selectedProgram.link}
              target="_blank"
              className="mt-4 inline-block text-blue-600 hover:underline"
            >
              ...पुरा पढ्नुहोस्
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
