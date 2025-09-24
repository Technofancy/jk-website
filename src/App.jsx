import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import BooksPage from "./pages/BooksPage";
import NewsPage from "./pages/NewsPage";
import PressReleasePage from "./pages/PressReleasePage";
import ProgramsPage from "./pages/ProgramsPage";
import GalleryPage from "./pages/GalleryPage";
import ContactPage from "./pages/ContactPage";

export default function App() {
  return (
    <Router>
      <div className="font-sans bg-gray-50 min-h-screen flex flex-col">
        {/* keep navbar fixed and on top */}
        <Navbar className="fixed top-0 left-0 right-0 z-50" />
        {/* add top padding equal to navbar height (h-16 → pt-16). adjust if you change height */}
        <main className="flex-grow pt-16">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/books" element={<BooksPage />} />
            <Route path="/news" element={<NewsPage />} />
            <Route path="/press" element={<PressReleasePage />} />
            <Route path="/programs" element={<ProgramsPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
