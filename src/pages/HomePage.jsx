import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Hero from "../components/Hero";
import SEO from "../components/SEO";

export default function HomePage() {
  const { t } = useTranslation();

  // function to convert English numbers to Nepali numbers
  // const toNepaliNumber = (num) => {
  //   const nepaliDigits = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'];
  //   return num.toString().split('').map(d => nepaliDigits[parseInt(d)]).join('');
  // };

  const programs = [
    {
      title: t("programs.education"),
      description: "शिक्षाको क्षेत्रमा गुणस्तरीय सेवा प्रदान गर्दै समुदायको विकासमा योगदान पुर्याउने।",
      icon: "📚"
    },
    {
      title: t("programs.technology"),
      description: "प्रविधिको माध्यमबाट समुदायलाई सशक्त बनाउने र डिजिटल साक्षरता बढाउने।",
      icon: "💻"
    },
    {
      title: t("programs.community"),
      description: "सामुदायिक विकासका लागि विभिन्न कार्यक्रमहरू सञ्चालन गर्ने।",
      icon: "🤝"
    }
  ];

  return (
    <>
      <SEO 
        title={t("home")}
        description={t("hero.description")}
        keywords="Jaro Kilo Foundation, Nepal, Education, Technology, Community Development, जरो किलो प्रतिष्ठान"
      />
      
      <div className="space-y-16">
        {/* Hero */}
        <Hero />
        
        {/* Mission Statement */}
        <section className="max-w-6xl bg-gradient-to-r from-red-700 via-red-500 to-orange-300 mx-auto p-8 rounded-lg shadow-lg transition-colors duration-300" data-aos="fade-up">
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-6 text-white">{t("about.mission")}</h2>
            <p className="text-lg text-gray-100 leading-relaxed max-w-4xl mx-auto">
              {t("about.missionText")}
            </p>
          </div>
        </section>

        {/* About Section */}
        <section className="max-w-6xl mx-auto px-6 rounded-lg bg-gradient-to-r from-red-700 via-red-500 to-orange-300" data-aos="fade-up" data-aos-delay="100" >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ">
            <div>
              <h2 className="text-4xl font-bold mb-6 py-4 text-gray-100">{t("about.title")}</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-100">{t("about.vision")}</h3>
                  <p className="text-gray-300">{t("about.visionText")}</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-100">{t("about.values")}</h3>
                  <p className="text-gray-300">{t("about.valuesText")}</p>
                </div>
              </div>
              <Link 
                to="/about" 
                className="inline-block mt-6 bg-yellow-300 text-red-500 px-6 py-3 m-2 rounded-lg hover:bg-yellow-400 font-bold transition-colors duration-200"
              >
                {t("hero.cta")}
              </Link>
            </div>
            <div className="bg-white border-l-4 border-yellow-500 p-8 rounded-lg transition-colors duration-300">
              <div className="text-center">
                {/* <div className="text-6xl mb-4">🏛️</div> */}
                <h3 className="text-2xl font-bold text-red-500 mb-4">
                  {t("hero.subtitle")}
                </h3>
                <p className="text-red-300">
                  विज्ञान र धर्मको सामंजस्यमा आधारित समाजको निर्माण
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Programs Preview */}
        <section className="bg-gradient-to-r from-red-700 via-red-500 to-orange-300 max-w-6xl mx-auto px-6" data-aos="fade-up" data-aos-delay="200">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-100 p-4">{t("programs.title")}</h2>
            <p className="text-lg text-gray-300">हाम्रा मुख्य कार्यक्रमहरूको झलक</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {programs.map((program, index) => (
              <div 
                key={index} 
                className="bg-white  p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-yellow-500 mb-2"
                data-aos="fade-up" 
                data-aos-delay={200 + index * 50}
              >
                <div className="text-4xl mb-4">{program.icon}</div>
                <h3 className="font-bold text-xl mb-3 text-gray-900">{program.title}</h3>
                <p className="text-gray-600 mb-4">{program.description}</p>
                <Link 
                  to="/programs" 
                  className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 font-medium transition-colors duration-200"
                >
                  थप जान्नुहोस् →
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Statistics Section */}
        {/* <section className="bg-gradient-to-r from-red-700 via-red-500 to-orange-300 dark:bg-red-700 text-white py-16 transition-colors duration-300" data-aos="fade-up" data-aos-delay="400">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold mb-2">{toNepaliNumber(500)}+</div>
                <div className="text-lg">लाभान्वित परिवार</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">{toNepaliNumber(50)}+</div>
                <div className="text-lg">सम्पन्न कार्यक्रम</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">{toNepaliNumber(10)}+</div>
                <div className="text-lg">सहयोगी संस्था</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">{toNepaliNumber(5)}+</div>
                <div className="text-lg">वर्षको अनुभव</div>
              </div>
            </div>
          </div>
        </section> */}

        {/* Call to Action */}
        <section className="max-w-6xl mx-auto px-6 text-center" data-aos="fade-up" data-aos-delay="300">
          <div className="bg-gradient-to-r from-red-700 to-red-500 dark:from-orange-300 text-white p-12 rounded-lg transition-colors duration-200">
            <h2 className="text-3xl font-bold mb-4">हामीसँग जोडिनुहोस्</h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto">
              समाजको विकासमा योगदान पुर्याउन र सकारात्मक परिवर्तन ल्याउन हामीसँग सहकार्य गर्नुहोस्।
            </p>
            <div className="space-x-4">
              <Link 
                to="/contact" 
                className="inline-block bg-white dark:bg-gray-100 text-red-600 dark:text-red-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 dark:hover:bg-gray-200 transition-colors duration-200"
              >
                सम्पर्क गर्नुहोस्
              </Link>
              <Link 
                to="/programs" 
                className="inline-block border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-red-600 dark:hover:text-red-700 transition-colors duration-200"
              >
                कार्यक्रमहरू हेर्नुहोस्
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}