import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();

  const quickLinks = [
    { label: t("navbar.home"), to: "/" },
    { label: t("navbar.about"), to: "/about" },
    { label: t("navbar.programs"), to: "/programs" },
    { label: t("navbar.contact"), to: "/contact" }
  ];

  return (
    <footer className="bg-red-800 text-white">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* About Section */}
          <div>
            <h3 className="text-xl font-bold mb-4">{t("hero.title")}</h3>
            <p className="text-gray-300 mb-4 leading-relaxed">
              {t("footer.description")}
            </p>
            <div className="text-sm text-gray-400">
              <p className="italic">"{t("hero.subtitle")}"</p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">{t("footer.quickLinks")}</h3>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.to} 
                    className="text-gray-300 hover:text-yellow-300 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h3 className="text-xl font-bold mb-4">{t("footer.followUs")}</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">📧</span>
                <a 
                  href="mailto:info@jarokilofoundation.org" 
                  className="text-gray-300 hover:text-yellow-300 transition-colors"
                >
                  info@jarokilofoundation.org
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-2xl">📞</span>
                <span className="text-gray-300">+977-1-XXXXXXX</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-2xl">📍</span>
                <span className="text-gray-300">Kathmandu, Nepal</span>
              </div>
            </div>
            
            {/* Social Media Links */}
            <div className="flex space-x-4 mt-6">
              <a 
                href="#" 
                className="text-2xl hover:text-yellow-300 transition-colors"
                title="Facebook"
              >
                📘
              </a>
              <a 
                href="#" 
                className="text-2xl hover:text-yellow-300 transition-colors"
                title="Twitter"
              >
                🐦
              </a>
              <a 
                href="#" 
                className="text-2xl hover:text-yellow-300 transition-colors"
                title="YouTube"
              >
                📺
              </a>
              <a 
                href="#" 
                className="text-2xl hover:text-yellow-300 transition-colors"
                title="LinkedIn"
              >
                💼
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-red-600 mt-8 pt-8 text-center">
          <p className="text-gray-300">
            {t("footer.copyright")}
          </p>
          <p className="text-sm text-gray-400 mt-2">
            Developed By Bhuwan Khatri (Technofancy)
          </p>
        </div>
      </div>
    </footer>
  );
}
