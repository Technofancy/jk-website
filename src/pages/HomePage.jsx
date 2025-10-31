import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import HeroSlider from "../components/layout/HeroSlider";
import SEO from "../components/ui/SEO";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import { fetchPrograms } from "../api/programs";
import { fetchBooks } from "../api/books";
import { convertToNepaliDate } from "../lib/dateConverter";

function getRandomSubset(array, count) {
  return [...array].sort(() => 0.5 - Math.random()).slice(0, count);
}

export default function HomePage() {
  const { t } = useTranslation();
  const [programs, setPrograms] = useState([]);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorPrograms, setErrorPrograms] = useState(null);
  const [errorBooks, setErrorBooks] = useState(null);

  useEffect(() => {
    async function loadData() {
      try {
        const [{ items: p }, { items: b }] = await Promise.all([
          fetchPrograms(1, 12, true),
          fetchBooks(1, 12, true),
        ]);

        setPrograms(Array.isArray(p) ? getRandomSubset(p, 6) : []);
        setBooks(Array.isArray(b) ? getRandomSubset(b, 6) : []);
      } catch (err) {
        console.error(err);
        setErrorPrograms(t("common.error"));
        setErrorBooks(t("common.error"));
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [t]);

  const sectionVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const renderScrollCards = (items, type) => (
    <motion.div
      className="flex gap-4 overflow-x-auto pb-4 px-2 sm:px-4 scrollbar-hide snap-x snap-mandatory"
      whileTap={{ cursor: "grabbing" }}
      tabIndex="0"
    >
      {items.map((item) => (
        <motion.div
          key={item.id}
          variants={itemVariants}
          className="min-w-[85%] sm:min-w-[45%] lg:min-w-[30%] snap-center flex-shrink-0"
        >
          <Link to={`/${type}/${item.slug}`}>
            <Card className="h-full text-left hover:shadow-lg transition-shadow">
              {type === "programs" && item.acf?.picture?.url && (
                <img
                  src={item.acf.picture.url}
                  alt={item.acf.program_heading}
                  className="w-full h-48 object-cover rounded-md mb-3"
                />
              )}
              {type === "books" && item.imageUrl && (
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-48 object-cover rounded-md mb-3"
                />
              )}
              <h3 className="text-xl font-bold text-text-default mb-2 line-clamp-2">
                {type === "programs"
                  ? item.acf?.program_heading
                  : item.title}
              </h3>
              <p className="text-primary-default font-medium text-sm mb-2">
                {type === "programs"
                  ? convertToNepaliDate(item.acf?.start_date)
                  : item.author}
              </p>
              <p className="text-text-muted line-clamp-3">
                {type === "programs"
                  ? item.acf?.text_contents
                  : item.excerpt}
              </p>
            </Card>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );

  return (
    <>
      <SEO
        title={t("home")}
        description={t("hero.description")}
        keywords="जरो, किलो, प्रतिष्ठान, Jaro, Kilo, Foundation, नेपाल, Nepal, Root, Locus, Education, Culture, Science, विज्ञान, Technology, प्रविधि, Dharma, धर्म, Sahridayata, सहृदयता, Kind-hearted, विचारधारा, Ideology, Sanatan, सनातन"
      />

      <div className="min-w-full">
        <HeroSlider />

        {/* About Section */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-start my-12">
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-text-default">
              {t("homePage.aboutSection.title")}
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-primary-default">
                  {t("homePage.aboutSection.vision.title")}
                </h3>
                <p className="text-text-muted">
                  {t("homePage.aboutSection.vision.text")}
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-primary-default">
                  {t("aboutPage.introduction.title")}
                </h3>
                <p className="text-text-muted line-clamp-5">
                  {t("aboutPage.introduction.text")}
                </p>
              </div>
            </div>
            <Link to="/about">
              <Button variant="primary" className="mt-6">
                {t("homePage.aboutSection.cta")}
              </Button>
            </Link>
          </motion.div>

          <motion.div
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="text-center mb-6 border-y-2 border-primary-default rounded-md py-2">
              <h2 className="text-3xl sm:text-4xl font-bold text-text-default">
                {t("homePage.facebookIframe.title")}
              </h2>
              <p className="text-text-muted mt-2">
                {t("homePage.facebookIframe.description")}
              </p>
            </div>
            <div className="flex justify-center rounded-md border-x-2 border-primary-default">
              <iframe
                title="Facebook Page"
                src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FJAROKILOPRATISHTHANEPAL&tabs=timeline&width=500&height=600&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true"
                width="500"
                height="600"
                className="border-none overflow-hidden w-full"
                scrolling="no"
                frameBorder="0"
                allowFullScreen={true}
                loading="lazy"
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
              ></iframe>
            </div>
          </motion.div>
        </section>

        {/* Programs Section */}
        <section className="text-center mt-16">
          <div className="border-y-2 border-primary-default rounded-md py-2 mt-2">
            <h2 className="text-3xl sm:text-4xl font-bold text-text-default mb-2">
              {t("homePage.programSlider.title")}
            </h2>
            <p className="text-text-muted mb-8">
              {t("homePage.programSlider.subtitle")}
            </p>
          </div>

          {loading && (
            <div className="py-10 text-text-muted">{t("common.loading")}</div>
          )}
          {errorPrograms && !loading && (
            <div className="py-10 text-error-default">{errorPrograms}</div>
          )}
          {!loading && programs.length > 0 && renderScrollCards(programs, "programs")}
        </section>

        {/* Books Section */}
        <section className="text-center mt-16">
          <div className="border-y-2 border-primary-default rounded-md py-2 mt-2">
            <h2 className="text-3xl sm:text-4xl font-bold text-text-default mb-2">
              {t("homePage.bookSlider.title")}
            </h2>
            <p className="text-text-muted mb-8">
              {t("homePage.bookSlider.subtitle")}
            </p>
          </div>

          {loading && (
            <div className="py-10 text-text-muted">{t("common.loading")}</div>
          )}
          {errorBooks && !loading && (
            <div className="py-10 text-error-default">{errorBooks}</div>
          )}
          {!loading && books.length > 0 && renderScrollCards(books, "books")}
        </section>

        {/* Join Section */}
        <motion.section
          className="bg-primary-default text-text-on-primary p-8 mb-2 sm:p-12 rounded-lg text-center shadow-lg"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            {t("common.joinUs")}
          </h2>
          <p className="mb-6 max-w-xl mx-auto">{t("common.joinText")}</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/contact">
              <Button variant="primary">{t("common.contact")}</Button>
            </Link>
            <Link to="/programs">
              <Button variant="secondary">{t("common.viewPrograms")}</Button>
            </Link>
          </div>
        </motion.section>
      </div>
    </>
  );
}