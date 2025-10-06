import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import SEO from "../components/SEO";
import AOS from "aos";
import "aos/dist/aos.css";

export default function AboutPage() {
  const { t } = useTranslation();

  useEffect(() => {
    AOS.init({ duration: 1000, once: true, easing: "ease-in-out" });
  }, []);

  // Fetch about object safely
  const about = t("about", { returnObjects: true });

  return (
    <>
      <SEO
        title={about.title}
        description={about.introduction.text}
        keywords="Jaro Kilo Foundation, Objectives, Team, Nepal"
      />

      <div className="space-y-16 px-4 sm:px-6 lg:px-8">
        {/* Short Bar / About Us Title */}
        <section className="bg-red-600 text-white py-2 my-4 text-center rounded">
          <h1 className="text-2xl sm:text-3xl font-bold">{about.title}</h1>
        </section>

        {/* Introduction & Objectives */}
        <section className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
          {/* Left: Introduction + Objectives */}
          <div data-aos="fade-right">
            <h2 className="text-3xl font-bold text-red-600 mb-4">
              {about.introduction.title}
            </h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              {about.introduction.text}
            </p>

            <h3 className="text-2xl font-semibold text-red-600 mb-3">
              {about.objectives.title}
            </h3>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              {about.objectives.list.map((obj, idx) => (
                <li key={idx}>{obj}</li>
              ))}
            </ul>
          </div>

          {/* Right: Facebook iframe */}
          <div data-aos="fade-left" className="w-full h-full items-center border-2 border-red-600">
            <iframe
              src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FJAROKILOPRATISHTHANEPAL&tabs=timeline&width=340&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true"
              width="340"
              height="500"
              style={{ border: "none", overflow: "hidden", margin: "auto" }}
              scrolling="no"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
              allowFullScreen={true}
            />
          </div>
        </section>

        {/* Founding Members */}
        <section className="py-16 mt-14 bg-gray-50 rounded-lg">
          <div className="max-w-6xl mx-auto text-center mb-12 shadow-lg rounded-md border-x-4 border-yellow-400">
            <h2
              className="text-4xl font-bold text-gray-800"
              data-aos="fade-down"
            >
              {about.foundingMembers.title}
            </h2>
            <p
              className="text-lg text-gray-600 mt-2 border-b-2 border-yellow-400"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              {about.foundingMembers.chairperson}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {about.foundingMembers.members.map((member, idx) => (
              <div
                key={idx}
                className="bg-white p-4 rounded-lg shadow-md text-center hover:shadow-xl transition-all duration-100 transform hover:-translate-y-1 hover:scale-105 border-l-4 border-yellow-400"
                data-aos="fade-up"
                data-aos-delay={idx * 10}
              >
                <p className="text-gray-800">{member}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-gradient-to-r from-red-700 via-red-500 to-orange-300 text-white py-16 rounded-lg text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-4" data-aos="fade-up">
              {t("common.joinUs")}
            </h2>
            <p className="text-lg mb-8" data-aos="fade-up" data-aos-delay="200">
              {t("common.joinText")}
            </p>
            <div
              className="flex flex-col sm:flex-row justify-center gap-4"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              <a
                href="/contact"
                className="inline-block bg-yellow-300 text-red-600 px-8 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition-colors duration-300"
              >
                {t("common.contact")}
              </a>
              <a
                href="/programs"
                className="inline-block border-2 border-yellow-500 text-yellow-500 px-8 py-3 rounded-lg font-semibold hover:bg-yellow-400 hover:text-red-600 transition-colors duration-300"
              >
                {t("common.viewPrograms")}
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
