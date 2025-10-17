import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import logo from "../assets/JK_pratisthanLogo.png";
import LanguageSwitcher from "./LanguageSwitcher";
// import ThemeToggle from "./ThemeToggle";

export default function Navbar({ className = "" }) {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();
  const location = useLocation();
  
  const links = [
    { label: t("navbar.home"), to: "/", active: location.pathname === "/" },
    { label: t("navbar.about"), to: "/about", active: location.pathname === "/about" },
    { label: t("navbar.programs"), to: "/programs", active: location.pathname === "/programs" },
    { label: t("navbar.press"), to: "/press", active: location.pathname === "/press" },
    { label: t("navbar.books"), to: "/books", active: location.pathname === "/books" },
    { label: t("navbar.news"), to: "/news", active: location.pathname === "/news" },
    { label: t("navbar.gallery"), to: "/gallery", active: location.pathname === "/gallery" },
    { label: t("navbar.contact"), to: "/contact", active: location.pathname === "/contact" },
  ];

  return (
    <nav className={`bg-primary-700 text-text-inverted px-4 h-16 flex items-center justify-between w-screen shadow-lg transition-colors duration-300 ${className}`}>
      <Link to="/" className="flex items-center gap-3 text-2xl font-bold cursor-pointer z-50">
        <img src={logo} alt="Jaro Kilo Foundation logo" className="h-10 w-auto rounded sm:h-12" />
        <div className="flex flex-col text-center">
          <span className="whitespace-normal text-md sm:text-base md:text-md lg:text-xl text-center">
            {t("navbar.orgName")}
          </span>
        </div>
      </Link>

      {/* Desktop menu */}
      <div className="hidden md:text-md lg:text-lg md:flex items-center space-x-0">
        {links.map((l) => (
          <Link
            key={l.to}
            to={l.to}
            className={`motion-safe:transition-colors motion-safe:duration-150 px-2 py-1 rounded hover:text-secondary-300 ${l.active ? 'text-secondary-300' : ''}`}
          >
            {l.label}
          </Link>
        ))}
        <div className="flex items-center ml-4">
          <LanguageSwitcher />
          {/* <ThemeToggle /> */}
        </div>
      </div>

      {/* Mobile menu button and controls */}
      <div className="md:hidden flex items-center gap-2">
        <LanguageSwitcher />
        {/* <ThemeToggle /> */}
        <button 
          onClick={() => setOpen(!open)} 
          className="text-xl p-1 rounded motion-safe:transition-colors motion-safe:duration-150 hover:bg-primary-600"
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          ☰
        </button>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="absolute top-16 left-0 right-0 z-40 md:hidden mt-0 bg-gradient-to-r from-primary-700 via-primary-500 to-accent-300 p-2 rounded-b shadow-lg border-t border-primary-500">
          <div className="flex flex-col space-y-2">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="motion-safe:transition-colors motion-safe:duration-150 px-4 py-2 rounded hover:text-secondary-300 hover:bg-primary-500/70"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
