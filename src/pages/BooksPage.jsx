import React, { useEffect, useState } from "react";
import { fetchBooks } from "../api/books"; // your API function for books

export default function BooksPage() {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null); // for modal

  useEffect(() => {
    fetchBooks().then(setBooks);
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-4 space-y-8">
      <h1 className="text-4xl font-bold text-center mb-4 animate-fadeIn bg-red-500 rounded-xl p-2">
        पुस्तकहरु
      </h1>

      {/* Book cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.length === 0 ? (
          <p className="text-center col-span-full">पुस्तकहरु खुल्दैछ...</p>
        ) : (
          books.map((book) => (
            <div
              key={book.id}
              onClick={() => setSelectedBook(book)}
              className="cursor-pointer bg-gradient-to-r from-red-500 via-red-300 to-orange-100 rounded shadow p-4 hover:shadow-lg transition-transform transform hover:scale-105"
            >
              <h2 className="text-xl font-semibold mb-1">{book.title?.rendered || "Untitled"}</h2>
              <p className="text-gray-600 text-sm mb-2">
                {book.acf?.author || "Unknown Author"} | {new Date(book.date).toLocaleDateString()}
              </p>
              {book.acf?.cover_image?.url && (
                <img
                  src={book.acf.cover_image.url}
                  alt={book.title?.rendered}
                  className="w-full h-48 object-cover mb-2 rounded"
                />
              )}
              <div
                dangerouslySetInnerHTML={{
                  __html: book.excerpt?.rendered
                    ? book.excerpt.rendered.slice(0, 100) + "..."
                    : "No preview available",
                }}
              ></div>
            </div>
          ))
        )}
      </div>

      {/* Modal for full view */}
      {selectedBook && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 p-4">
          <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 relative">
            <button
              onClick={() => setSelectedBook(null)}
              className="absolute top-3 right-3 text-red-500 text-2xl font-bold hover:text-red-700"
            >
              &times;
            </button>
            <h2 className="text-3xl font-bold mb-2">{selectedBook.title?.rendered || "Untitled"}</h2>
            <p className="text-gray-600 text-sm mb-4">
              {selectedBook.acf?.author || "Unknown Author"} | {new Date(selectedBook.date).toLocaleDateString()}
            </p>
            {selectedBook.acf?.cover_image?.url && (
              <img
                src={selectedBook.acf.cover_image.url}
                alt={selectedBook.title?.rendered}
                className="w-full mb-4 object-cover rounded"
              />
            )}
            <div
              dangerouslySetInnerHTML={{
                __html: selectedBook.content?.rendered || selectedBook.acf?.full_content || "No content available",
              }}
            ></div>
            {selectedBook.acf?.external_link && (
              <a
                href={selectedBook.acf.external_link}
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
