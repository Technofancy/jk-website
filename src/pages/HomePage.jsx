import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Hero from "../components/Hero";
import SEO from "../components/SEO";
import AOS from "aos";
import "aos/dist/aos.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// API stubs: Replace with real endpoints in src/api when available
// Each fetch returns an array with normalized objects and includes basic
// error handling. See files for response shape expectations.
import { fetchPrograms } from "../api/programs";
import { fetchBooks } from "../api/books";

// 🔁 Helper to pick N random items from an array
function getRandomSubset(array, count) {
  return [...array].sort(() => 0.5 - Math.random()).slice(0, count);
}

export default function HomePage() {
  const { t } = useTranslation();

  // Loading and error states for sliders
  const [programs, setPrograms] = useState([]);
  const [books, setBooks] = useState([]);
  const [loadingPrograms, setLoadingPrograms] = useState(true);
  const [loadingBooks, setLoadingBooks] = useState(true);
  const [errorPrograms, setErrorPrograms] = useState(null);
  const [errorBooks, setErrorBooks] = useState(null);

  // Initialize AOS
  useEffect(() => {
    AOS.init({ duration: 1000, once: true, easing: "ease-in-out" });
  }, []);

  // Fetch programs
  useEffect(() => {
    async function loadPrograms() {
      try {
        setLoadingPrograms(true);
        setErrorPrograms(null);

        const { items } = await fetchPrograms(1, 12); // <-- destructure items
        if (Array.isArray(items)) {
          const randomPrograms = getRandomSubset(items, 6);
          setPrograms(randomPrograms);
        } else {
          setPrograms([]);
        }
      } catch (err) {
        setErrorPrograms(t("common.error"));
        console.log(err);
      } finally {
        setLoadingPrograms(false);
      }
    }
    loadPrograms();
  }, [t]);

  // Fetch books
  useEffect(() => {
    async function loadBooks() {
      try {
        setLoadingBooks(true);
        setErrorBooks(null);
        const data = await fetchBooks({ per_page: 12 });
        if (Array.isArray(data)) {
          const randomBooks = getRandomSubset(data, 6);
          setBooks(randomBooks);
        } else {
          setBooks([]);
        }
      } catch (err) {
        setErrorBooks(t("common.error"));
        console.log(err);
      } finally {
        setLoadingBooks(false);
      }
    }
    loadBooks();
  }, [t]);

  // Slider settings
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

  return (
    <>
      <SEO
        title={t("home")}
        description={t("hero.description")}
        keywords="जरो, किलो, प्रतिष्ठान, Jaro, Kilo, Foundation, नेपाल, Nepal, Root, Locus, Education, Culture, Science, विज्ञान, Technology, प्रविधि, Dharma, धर्म, Sahridayata, सहृदयता, Kind-hearted, विचारधारा, Ideology, Sanatan, सनातन"
      />

      <div className="min-w-full">
        {/* Hero (kept as existing) */}
        <Hero />

        {/* Facebook iframe section */}
        <section className="my-12" data-aos="fade-up">
          <div className="text-center mb-6 border-y-2 border-yellow-500 rounded-md py-2">
            <h2 className="text-3xl sm:text-4xl font-bold text-primary-700">
              {t("homePage.facebookIframe.title")}
            </h2>
            <p className="text-muted mt-2">
              {t("homePage.facebookIframe.description")}
            </p>
          </div>
          <div className="flex justify-center rounded-md border-x-2 border-yellow-500">
            <iframe
              title="Facebook Page"
              src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FJAROKILOPRATISHTHANEPAL&tabs=timeline&width=500&height=600&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true"
              width="500"
              height="600"
              style={{ border: "none", overflow: "hidden" }}
              scrolling="no"
              frameBorder="0"
              allowFullScreen={true}
              loading="lazy"
              allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
            ></iframe>
          </div>
        </section>

        {/* About Section */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          <div data-aos="fade-right">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-primary-700">
              {t("homePage.aboutSection.title")}
            </h2>
            <div className="space-y-6">
              <div data-aos="fade-up" data-aos-delay="100">
                <h3 className="text-xl font-semibold text-primary-600">
                  {t("homePage.aboutSection.vision.title")}
                </h3>
                <p className="text-text">
                  {t("homePage.aboutSection.vision.text")}
                </p>
              </div>
              <div data-aos="fade-up" data-aos-delay="200">
                <h3 className="text-xl font-semibold text-primary-600">
                  {t("homePage.aboutSection.values.title")}
                </h3>
                <p className="text-text">
                  {t("homePage.aboutSection.values.text")}
                </p>
              </div>
            </div>
            <Link
              to="/about"
              className="inline-block mt-6 bg-secondary-400 text-primary-800 px-6 py-3 rounded-lg font-bold motion-safe:transition-colors motion-safe:duration-200 hover:bg-secondary-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary-400"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              {t("homePage.aboutSection.cta")}
            </Link>
          </div>
          <div
            className="bg-surface p-6 rounded-lg shadow-lg border-l-4 border-secondary-400"
            data-aos="fade-left"
          >
            <h3 className="text-2xl font-bold text-primary-600 mb-3">
              {t("hero.subtitle")}
            </h3>
            <p className="text-text">
              {t("homePage.aboutSection.mission.text")}
            </p>
          </div>
        </section>

        {/* Programs Slider */}
        <section className="text-center mt-16">
          <div className="border-y-2 border-yellow-500 rounded-md py-2 mt-2">
            <h2
              className="text-3xl sm:text-4xl font-bold text-red-700 mb-2"
              data-aos="fade-down"
            >
              {t("homePage.programSlider.title")}
            </h2>
            <p
              className="text-muted mb-8"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              {t("homePage.programSlider.subtitle")}
            </p>
          </div>

          {/* Loading and error states */}
          {loadingPrograms && (
            <div className="py-10 text-muted">{t("common.loading")}</div>
          )}
          {errorPrograms && !loadingPrograms && (
            <div className="py-10 text-red-600">{errorPrograms}</div>
          )}

          {!loadingPrograms &&
            !errorPrograms &&
            (programs.length === 0 ? (
              <div className="py-10 text-muted">
                {t("homePage.programSlider.noPrograms")}
              </div>
            ) : (
              <Slider {...sliderSettings}>
                {programs.map((program, idx) => (
                  <div
                    key={program.id || idx}
                    className="bg-surface p-6 rounded-lg shadow-md hover:shadow-2xl motion-safe:transition-all motion-safe:duration-300 text-left transform hover:-translate-y-1 hover:scale-[1.02] m-4 border-l-4 border-yellow-400"
                    data-aos="fade-up"
                    data-aos-delay={200 + idx * 100}
                  >
                    {program.acf?.picture?.url && (
                      <img
                        src={program.acf.picture.url}
                        alt={program.acf.program_heading}
                        className="w-full h-48 object-cover rounded-md mb-3"
                      />
                    )}
                    <h3 className="text-xl font-bold text-text mb-2 line-clamp-2">
                      {program.acf?.program_heading}
                    </h3>
                    <p className="text-primary-700 font-medium text-sm mb-2">
                      {program.acf?.start_date}
                    </p>
                    <p className="text-muted line-clamp-3">
                      {program.acf?.text_contents}
                    </p>
                    <a
                      href="/programs"
                      className="inline-block mt-3 text-xl font-semibold text-yellow-600 hover:text-yellow-800 transition-colors"
                    >
                      {t("...")} →
                    </a>
                  </div>
                ))}
              </Slider>
            ))}
        </section>

        {/* Books Slider */}
        <section className="text-center mt-16">
          <div className="border-y-2 border-yellow-500 rounded-md py-2 mt-2">
            <h2
              className="text-3xl sm:text-4xl font-bold text-yellow-700 mb-2"
              data-aos="fade-down"
            >
              {t("homePage.bookSlider.title")}
            </h2>
            <p
              className="text-muted mb-8"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              {t("homePage.bookSlider.subtitle")}
            </p>
          </div>

          {/* Loading and error states */}
          {loadingBooks && (
            <div className="py-10 text-muted">{t("common.loading")}</div>
          )}
          {errorBooks && !loadingBooks && (
            <div className="py-10 text-red-600">{errorBooks}</div>
          )}

          {!loadingBooks &&
            !errorBooks &&
            (books.length === 0 ? (
              <div className="py-10 text-muted">
                {t("homePage.bookSlider.noBooks")}
              </div>
            ) : (
              <Slider {...sliderSettings}>
                {books.map((book, idx) => (
                  <div
                    key={book.id || idx}
                    className="bg-surface p-6 rounded-lg shadow-md hover:shadow-2xl motion-safe:transition-all motion-safe:duration-300 text-left transform hover:-translate-y-1 hover:scale-[1.02] m-4 border-l-4 border-yellow-400"
                    data-aos="fade-up"
                    data-aos-delay={200 + idx * 100}
                  >
                    {book.imageUrl && (
                      <img
                        src={book.imageUrl}
                        alt={book.title}
                        className="w-full h-48 object-cover rounded-md mb-3"
                      />
                    )}
                    <h3 className="text-xl font-bold text-text mb-2 line-clamp-2">
                      {book.title}
                    </h3>
                    <p className="text-primary-700 font-medium text-sm mb-2">
                      {book.author}
                    </p>
                    <p className="text-muted line-clamp-3">{book.excerpt}</p>
                    {/* <a
              href="/books"
              className="inline-block mt-3 text-sm font-semibold text-yellow-600 hover:text-yellow-800 transition-colors"
            >
              {t("common.learnMore")} →
            </a> */}
                  </div>
                ))}
              </Slider>
            ))}
        </section>

        {/* Call to Action */}
        <section
          className="bg-gradient-to-r from-primary-700 to-primary-500 text-text-inverted p-8 mb-2 sm:p-12 rounded-lg text-center shadow-lg"
          data-aos="zoom-in"
        >
          <h2
            className="text-2xl sm:text-3xl font-bold mb-4"
            data-aos="fade-up"
          >
            {t("common.joinUs")}
          </h2>
          <p
            className="mb-6 max-w-xl mx-auto"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            {t("common.joinText")}
          </p>
          <div
            className="flex flex-col sm:flex-row justify-center gap-4"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <Link
              to="/contact"
              className="bg-secondary-400 text-primary-800 px-6 py-3 rounded-lg font-semibold motion-safe:transition-colors motion-safe:duration-200 hover:bg-secondary-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary-400"
            >
              {t("common.contact")}
            </Link>
            <Link
              to="/programs"
              className="border-2 text-secondary-300 border-secondary-300 px-6 py-3 rounded-lg font-semibold motion-safe:transition-colors motion-safe:duration-200 hover:bg-secondary-400 hover:text-primary-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary-400"
            >
              {t("common.viewPrograms")}
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
