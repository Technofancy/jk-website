import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";

export default function SEO({ 
  title, 
  description, 
  keywords, 
  image, 
  url,
  type = "website" 
}) {
  const { t, i18n } = useTranslation();
  
  const defaultTitle = t("hero.title");
  const defaultDescription = t("hero.description");
  const siteUrl = "https://jarokilo.org.np";
  const seoTitle = title ? `${title} | ${defaultTitle}` : defaultTitle;
  const seoDescription = description || defaultDescription;
  const seoImage = image || `${siteUrl}/JK_pratisthanLogo.png`;
  const seoUrl = url || siteUrl;

  useEffect(() => {
    // Update document title
    document.title = seoTitle;
    
    // Update or create meta tags
    const updateMetaTag = (name, content, property = false) => {
      if (!content) return;
      
      const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let meta = document.querySelector(selector);
      
      if (!meta) {
        meta = document.createElement('meta');
        if (property) {
          meta.setAttribute('property', name);
        } else {
          meta.setAttribute('name', name);
        }
        document.head.appendChild(meta);
      }
      
      meta.setAttribute('content', content);
    };

    // Basic meta tags
    updateMetaTag('description', seoDescription);
    updateMetaTag('keywords', keywords);
    updateMetaTag('language', i18n.language);
    updateMetaTag('author', 'Jaro Kilo Foundation Nepal');
    updateMetaTag('robots', 'index, follow');
    
    // Open Graph meta tags
    updateMetaTag('og:type', type, true);
    updateMetaTag('og:title', seoTitle, true);
    updateMetaTag('og:description', seoDescription, true);
    updateMetaTag('og:image', seoImage, true);
    updateMetaTag('og:url', seoUrl, true);
    updateMetaTag('og:site_name', defaultTitle, true);
    updateMetaTag('og:locale', i18n.language === "np" ? "ne_NP" : "en_US", true);
    
    // Twitter Card meta tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', seoTitle);
    updateMetaTag('twitter:description', seoDescription);
    updateMetaTag('twitter:image', seoImage);

    // Update canonical link
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', seoUrl);

    // Update favicon
    let favicon = document.querySelector('link[rel="icon"]');
    if (!favicon) {
      favicon = document.createElement('link');
      favicon.setAttribute('rel', 'icon');
      favicon.setAttribute('type', 'image/png');
      document.head.appendChild(favicon);
    }
    favicon.setAttribute('href', '/JK_pratisthanLogo.png');

  }, [seoTitle, seoDescription, seoImage, seoUrl, keywords, i18n.language, type, defaultTitle]);

  return null; // This component doesn't render anything
}