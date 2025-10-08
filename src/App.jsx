import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ThemeProvider from "./contexts/ThemeProvider";

import "swiper/css";
import "swiper/css/pagination";
import "aos/dist/aos.css";

import Layout from "./components/Layout";

// Route-based code splitting
const HomePage = lazy(() => import("./pages/HomePage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const BooksPage = lazy(() => import("./pages/BooksPage"));
const NewsPage = lazy(() => import("./pages/NewsPage"));
const PressReleasePage = lazy(() => import("./pages/PressReleasePage"));
const ProgramsPage = lazy(() => import("./pages/ProgramsPage"));
const GalleryPage = lazy(() => import("./pages/GalleryPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));

export default function App() {
  return (
    <ThemeProvider>
      <Router>
        <Layout>
          <Suspense fallback={<div className="p-6 text-center">Loading...</div>}>
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
          </Suspense>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}
