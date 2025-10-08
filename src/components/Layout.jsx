import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import SEO from "./SEO";

/**
 * Layout.jsx
 *
 * Purpose: Provide a unified layout with Navbar, Footer, and default SEO
 * for all pages. This standardizes container widths, paddings, and vertical
 * spacing in a mobile-first manner using Tailwind utilities.
 *
 * Notes:
 * - No dynamic theme switching is added; colors derive from Tailwind tokens
 *   defined in tailwind.config.js (primary, secondary, accent, surface, text, muted).
 * - Use this component to wrap all route pages.
 */
export default function Layout({
  children,
  seo = {
    title: undefined,
    description: undefined,
    keywords: undefined,
    image: undefined,
    url: undefined,
    type: "website",
  },
  className = "",
}) {
  return (
    <div className={`min-h-screen flex flex-col bg-surface-50 text-text ${className}`}>
      {/* Default SEO (pages can override by passing seo prop or using their own SEO component) */}
      <SEO {...seo} />

      {/* Keep navbar fixed at the top (h-16) */}
      <Navbar className="fixed top-0 left-0 right-0 z-50" />

      {/* Main content area with top padding to account for fixed navbar */}
      <main role="main" className="flex-grow pt-16 px-4 sm:px-6 lg:px-8">
        {children}
      </main>

      {/* Global footer */}
      <Footer />
    </div>
  );
}
