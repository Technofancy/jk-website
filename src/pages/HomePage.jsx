import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Hero from "../components/Hero";
import SEO from "../components/SEO";
import AOS from "aos";
import "aos/dist/aos.css";

export default function HomePage() {
  const { t } = useTranslation();
  const about = t("about", { returnObjects: true });

  const programs = [
    {
      title: t("programs.education"),
      description: "शिक्षाको क्षेत्रमा गुणस्तरीय सेवा प्रदान गर्दै समुदायको विकासमा योगदान पुर्याउने।",
      icon: "📚",
    },
    {
      title: t("programs.technology"),
      description: "प्रविधिको माध्यमबाट समुदायलाई सशक्त बनाउने र डिजिटल साक्षरता बढाउने।",
      icon: "💻",
    },
    {
      title: t("programs.community"),
      description: "सामुदायिक विकासका लागि विभिन्न कार्यक्रमहरू सञ्चालन गर्ने।",
      icon: "🤝",
    },
  ];

  // Initialize AOS
  useEffect(() => {
    AOS.init({ duration: 1000, once: true, easing: "ease-in-out" });
  }, []);

  return (
    <>
      <SEO
        title={t("home")}
        description={t("hero.description")}
        keywords="Jaro Kilo Foundation, Nepal, Education, Technology, Community Development, जरो किलो प्रतिष्ठान"
      />

      <div className="space-y-12 px-4 sm:px-6 lg:px-8">

        {/* Hero */}
        <Hero />

        {/* Mission Section */}
        <section
          className="bg-gradient-to-r from-red-700 via-red-500 to-orange-300 p-6 sm:p-12 rounded-lg shadow-xl text-center text-white"
          data-aos="zoom-in"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">{about.mission.title}</h2>
          <p className="text-lg sm:text-xl max-w-2xl mx-auto">{about.mission.text}</p>
        </section>

        {/* About Section */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          <div data-aos="fade-right">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-red-700">{about.title}</h2>
            <div className="space-y-6">
              <div data-aos="fade-up" data-aos-delay="100">
                <h3 className="text-xl font-semibold text-red-600">{about.vision.title}</h3>
                <p className="text-gray-700">{about.vision.text}</p>
              </div>
              <div data-aos="fade-up" data-aos-delay="200">
                <h3 className="text-xl font-semibold text-red-600">{about.values.title}</h3>
                <p className="text-gray-700">{about.values.text}</p>
              </div>
            </div>
            <Link
              to="/about"
              className="inline-block mt-6 bg-yellow-300 text-red-600 px-6 py-3 rounded-lg font-bold hover:bg-yellow-400 transition-colors duration-300"
              data-aos="fade-up" data-aos-delay="300"
            >
              {t("hero.cta")}
            </Link>
          </div>

          <div
            className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-yellow-400"
            data-aos="fade-left"
          >
            <h3 className="text-2xl font-bold text-red-500 mb-3">{t("hero.subtitle")}</h3>
            <p className="text-gray-700">विज्ञान र धर्मको सामंजस्यमा आधारित समाजको निर्माण</p>
          </div>
        </section>

        {/* Programs Section */}
        <section className="text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-6" data-aos="fade-down"> 
            {t("programs.title")}
          </h2>
          <p className="text-gray-600 mb-8" data-aos="fade-up" data-aos-delay="100">हाम्रा मुख्य कार्यक्रमहरूको झलक</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {programs.map((program, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-2xl transition-shadow duration-500 border-l-4 border-yellow-400 text-left transform hover:-translate-y-1 hover:scale-105"
                data-aos="fade-up"
                data-aos-delay={200 + idx * 100}
              >
                <div className="text-5xl mb-3 animate-bounce">{program.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{program.title}</h3>
                <p className="text-gray-600">{program.description}</p>
                <Link
                  to="/programs"
                  className="text-red-600 hover:text-red-800 font-medium mt-2 inline-block"
                >
                  थप जान्नुहोस् →
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section
          className="bg-gradient-to-r from-red-700 to-red-500 text-white p-8 sm:p-12 rounded-lg text-center shadow-lg"
          data-aos="zoom-in"
        >
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">हामीसँग जोडिनुहोस्</h2>
          <p className="mb-6 max-w-xl mx-auto" data-aos="fade-up" data-aos-delay="100">
            समाजको विकासमा योगदान पुर्याउन र सकारात्मक परिवर्तन ल्याउन हामीसँग सहकार्य गर्नुहोस्।
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4" data-aos="fade-up" data-aos-delay="200">
            <Link
              to="/contact"
              className="bg-yellow-300 text-red-600 px-6 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition-colors duration-300"
            >
              सम्पर्क गर्नुहोस्
            </Link>
            <Link
              to="/programs"
              className="border-2 text-yellow-400 border-yellow-400 px-6 py-3 rounded-lg font-semibold hover:bg-yellow-400 hover:text-red-600 transition-colors duration-300"
            >
              कार्यक्रमहरू हेर्नुहोस्
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
