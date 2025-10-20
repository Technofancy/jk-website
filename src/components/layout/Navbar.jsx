import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";
import logo from "../../assets/JK_pratisthanLogo.png";
import LanguageSwitcher from "../ui/LanguageSwitcher";
// import ThemeToggle from "../ui/ThemeToggle";
import Button from "../ui/Button";

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

  const menuVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
  };

  return (
    <nav className={`bg-background  text-text-default px-4 h-16 flex items-center justify-between w-screen shadow-lg transition-colors duration-300 border-b-4 border-secondary-500 ${className}`}>
      <Link to="/" className="flex items-center gap-3 text-2xl font-bold cursor-pointer z-50">
        <img src={logo} alt="Jaro Kilo Foundation logo" className="h-10 w-auto rounded sm:h-12" />
        <div className="flex flex-col text-center">
          <span className="whitespace-normal text-md text-sm sm:text-md   lg:text-xl text-center">
            {t("navbar.orgName")}
          </span>
        </div>
      </Link>

      {/* Desktop menu */}
      <div className="hidden md:text-md lg:text-lg md:flex items-center space-x-0 backdrop-blur-sm">
        {links.map((l) => (
          <Link
            key={l.to}
            to={l.to}
            className={`motion-safe:transition-colors motion-safe:duration-150 px-2 py-1 rounded hover:text-primary-500 ${l.active ? 'text-primary-500' : ''}`}
          >
            {l.label}
          </Link>
        ))}
        <div className="flex items-center ml-4 space-x-2">
          <LanguageSwitcher />
          {/* <ThemeToggle className="hidden disable" /> */}
        </div>
      </div>

      {/* Mobile menu button and controls */}
      <div className="md:hidden flex items-center gap-2 backdrop-blur-sm">
        <LanguageSwitcher />
        {/* <ThemeToggle className="hidden disable" /> */}
        <Button
          onClick={() => setOpen(!open)}
          variant="ghost"
          size="icon"
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          {open ? <FiX /> : <FiMenu />}
        </Button>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute top-16 left-0 right-0 z-40 md:hidden mt-0 bg-surface-default p-2 rounded-b shadow-lg border-t border-surface-200 backdrop-blur-lg"
          >
            <div className="flex flex-col space-y-2">
              {links.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className="motion-safe:transition-colors motion-safe:duration-150 px-4 py-2 rounded hover:text-primary-500 hover:bg-surface-100"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}