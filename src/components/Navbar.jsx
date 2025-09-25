import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import logo from "../assets/JK_pratisthanLogo.png";
import LanguageSwitcher from "./LanguageSwitcher";
// import ThemeToggle from "./ThemeToggle";

export default function Navbar({ className = "" }) {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();
  
  const links = [
    { label: t("navbar.home"), to: "/" },
    { label: t("navbar.about"), to: "/about" },
    { label: t("navbar.programs"), to: "/programs" },
    { label: t("navbar.press"), to: "/press" },
    { label: t("navbar.books"), to: "/books" },
    { label: t("navbar.news"), to: "/news" },
    { label: t("navbar.gallery"), to: "/gallery" },
    { label: t("navbar.contact"), to: "/contact" },
  ];

  return (
    <nav className={`bg-red-700 dark:bg-red-800 text-white px-4 h-16 flex items-center justify-between w-screen shadow-lg transition-colors duration-300 ${className}`}>
      <Link to="/" className="flex items-center gap-3 text-2xl font-bold cursor-pointer z-50">
        <img src={logo} alt="Jaro Kilo Foundation logo" className="h-10 w-auto rounded sm:h-12" />
        <div className="flex flex-col text-center">
          <span className="whitespace-normal text-sm sm:text-base md:text-sm lg:text-xl text-center">
            जरो किलो प्रतिष्ठान नेपाल
          </span>
        </div>
      </Link>

      {/* Desktop menu */}
      <div className="hidden md:flex items-center space-x-0">
        {links.map((l) => (
          <Link
            key={l.to}
            to={l.to}
            className="hover:text-yellow-300 dark:hover:text-yellow-200 transition-colors duration-100 px-2 py-1 rounded"
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
          className="text-xl p-1 hover:bg-red-600 dark:hover:bg-red-700 rounded transition-colors duration-200"
        >
          ☰
        </button>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="absolute top-16 left-0 right-0 z-40 md:hidden mt-0 bg-gradient-to-r from-red-700 via-red-500 to-orange-300 dark:bg-red-700 p-2 rounded-b shadow-lg border-t border-red-500 dark:border-red-600">
          <div className="flex flex-col space-y-2">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="hover:text-yellow-300 dark:hover:text-yellow-200 hover:bg-red-500 dark:hover:bg-red-600 transition-colors duration-200 px-4 py-2 rounded"
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
