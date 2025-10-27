import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Hero from "../components/layout/Hero";
import SEO from "../components/ui/SEO";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import { fetchPrograms } from "../api/programs";
import { fetchBooks } from "../api/books";

function getRandomSubset(array, count) {
  return [...array].sort(() => 0.5 - Math.random()).slice(0, count);
}

export default function HomePage() {
  const { t } = useTranslation();

  const [programs, setPrograms] = useState([]);
  const [books, setBooks] = useState([]);
  const [loadingPrograms, setLoadingPrograms] = useState(true);
  const [loadingBooks, setLoadingBooks] = useState(true);
  const [errorPrograms, setErrorPrograms] = useState(null);
  const [errorBooks, setErrorBooks] = useState(null);

  useEffect(() => {
    async function loadPrograms() {
      try {
        setLoadingPrograms(true);
        const { items } = await fetchPrograms(1, 12);
        setPrograms(Array.isArray(items) ? getRandomSubset(items, 6) : []);
      } catch (err) {
        setErrorPrograms(t("common.error"));
        console.error(err);
      } finally {
        setLoadingPrograms(false);
      }
    }
    loadPrograms();
  }, [t]);

  useEffect(() => {
    async function loadBooks() {
      try {
        setLoadingBooks(true);
        const { items } = await fetchBooks(1, 12);
        setBooks(Array.isArray(items) ? getRandomSubset(items, 6) : []);
      } catch (err) {
        setErrorBooks(t("common.error"));
        console.error(err);
      } finally {
        setLoadingBooks(false);
      }
    }
    loadBooks();
  }, [t]);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <>
      <SEO
        title={t("home")}
        description={t("hero.description")}
        keywords="जरो, किलो, प्रतिष्ठान, Jaro, Kilo, Foundation, नेपाल, Nepal, Root, Locus, Education, Culture, Science, विज्ञान, Technology, प्रविधि, Dharma, धर्म, Sahridayata, सहृदयता, Kind-hearted, विचारधारा, Ideology, Sanatan, सनातन"
      />

      <div className="min-w-full">
        <Hero />

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-top my-12">
          <motion.div
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-text-default">
              {t("homePage.aboutSection.title")}
            </h2>
            <div className="space-y-6">
              <motion.div variants={itemVariants}>
                <h3 className="text-xl font-semibold text-primary-default">
                  {t("homePage.aboutSection.vision.title")}
                </h3>
                <p className="text-text-muted">
                  {t("homePage.aboutSection.vision.text")}
                </p>
              </motion.div>
              <motion.div variants={itemVariants}>
                <h3 className="text-xl font-semibold text-primary-default">
                  {t("aboutPage.introduction.title")}
                </h3>
                <p className="text-text-muted line-clamp-5">
                  {t("aboutPage.introduction.text")}
                </p>
              </motion.div>
            </div>
            <Link to="/about">
              <Button variant="primary" className="mt-6">
                {t("homePage.aboutSection.cta")}
              </Button>
            </Link>
          </motion.div>
          <motion.div
            variants={itemVariants}
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

        <section className="text-center mt-16">
          <div className="border-y-2 border-primary-default rounded-md py-2 mt-2">
            <motion.h2
              className="text-3xl sm:text-4xl font-bold text-text-default mb-2"
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {t("homePage.programSlider.title")}
            </motion.h2>
            <motion.p
              className="text-text-muted mb-8"
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, delay: 0.1 }}
            >
              {t("homePage.programSlider.subtitle")}
            </motion.p>
          </div>

          {loadingPrograms && (
            <div className="py-10 text-text-muted">{t("common.loading")}</div>
          )}
          {errorPrograms && !loadingPrograms && (
            <div className="py-10 text-error-default">{errorPrograms}</div>
          )}

          {!loadingPrograms && !errorPrograms && (
            programs.length === 0 ? (
              <div className="py-10 text-text-muted">
                {t("homePage.programSlider.noPrograms")}
              </div>
            ) : (
              <Slider {...sliderSettings}>
                {programs.map((program) => (
                  <Link to={`/programs/${program.slug}`} key={program.id}>
                    <motion.div
                      variants={itemVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                    >
                      <Card className="m-4 text-left">
                        {program.acf?.picture?.url && (
                          <img
                            src={program.acf.picture.url}
                            alt={program.acf.program_heading}
                            className="w-full h-48 object-cover rounded-md mb-3"
                          />
                        )}
                        <h3 className="text-xl font-bold text-text-default mb-2 line-clamp-2">
                          {program.acf?.program_heading}
                        </h3>
                        <p className="text-primary-default font-medium text-sm mb-2">
                          {program.acf?.start_date}
                        </p>
                        <p className="text-text-muted line-clamp-3">
                          {program.acf?.text_contents}
                        </p>
                      </Card>
                    </motion.div>
                  </Link>
                ))}
              </Slider>
            )
          )}
        </section>


        <section className="text-center mt-16">
          <div className="border-y-2 border-primary-default rounded-md py-2 mt-2">
            <motion.h2
              className="text-3xl sm:text-4xl font-bold text-text-default mb-2"
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {t("homePage.bookSlider.title")}
            </motion.h2>
            <motion.p
              className="text-text-muted mb-8"
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, delay: 0.1 }}
            >
              {t("homePage.bookSlider.subtitle")}
            </motion.p>
          </div>

          {loadingBooks && (
            <div className="py-10 text-text-muted">{t("common.loading")}</div>
          )}
          {errorBooks && !loadingBooks && (
            <div className="py-10 text-error-default">{errorBooks}</div>
          )}

          {!loadingBooks && !errorBooks && (
            books.length === 0 ? (
              <div className="py-10 text-text-muted">
                {t("homePage.bookSlider.noBooks")}
              </div>
            ) : (
              <Slider {...sliderSettings}>
                {books.map((book) => (
                  <Link to={`/books/${book.slug}`} key={book.id}>
                    <motion.div
                      variants={itemVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                    >
                      <Card className="m-4 text-left">
                        {book.imageUrl && (
                          <img
                            src={book.imageUrl}
                            alt={book.title}
                            className="w-full h-48 object-cover rounded-md mb-3"
                          />
                        )}
                        <h3 className="text-xl font-bold text-text-default mb-2 line-clamp-2">
                          {book.title}
                        </h3>
                        <p className="text-primary-default font-medium text-sm mb-2">
                          {book.author}
                        </p>
                        <p className="text-text-muted line-clamp-3">{book.excerpt}</p>
                      </Card>
                    </motion.div>
                  </Link>
                ))}
              </Slider>
            )
          )}
        </section>

        <motion.section
          className="bg-primary-default text-text-on-primary p-8 mb-2 sm:p-12 rounded-lg text-center shadow-lg"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.h2
            className="text-2xl sm:text-3xl font-bold mb-4"
            variants={itemVariants}
          >
            {t("common.joinUs")}
          </motion.h2>
          <motion.p
            className="mb-6 max-w-xl mx-auto"
            variants={itemVariants}
          >
            {t("common.joinText")}
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row justify-center gap-4"
            variants={itemVariants}
          >
            <Link to="/contact">
              <Button variant="primary">{t("common.contact")}</Button>
            </Link>
            <Link to="/programs">
              <Button variant="secondary">
                {t("common.viewPrograms")}
              </Button>
            </Link>
          </motion.div>
        </motion.section>
      </div>
    </>
  );
}