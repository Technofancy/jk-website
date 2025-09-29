import React from "react";
import { useTranslation } from "react-i18next";
import SEO from "../components/SEO";

export default function AboutPage() {
  const { t, i18n } = useTranslation();

  const teamMembers = [
    {
      name: "Dr. राम बहादुर",
      position: "संस्थापक अध्यक्ष",
      description: "शिक्षा र सामाजिक विकासमा २० वर्षको अनुभव",
      image: "👨‍🎓"
    },
    {
      name: "सीता देवी",
      position: "कार्यकारी निर्देशक",
      description: "सामुदायिक विकास र महिला सशक्तिकरणमा विशेषज्ञ",
      image: "👩‍💼"
    },
    {
      name: "अर्जुन श्रेष्ठ",
      position: "कार्यक्रम संयोजक",
      description: "युवा विकास र प्रविधि शिक्षामा अग्रणी",
      image: "👨‍💻"
    }
  ];

  const achievements = [
    {
      number: "500+",
      label: "लाभान्वित परिवार",
      icon: "👨‍👩‍👧‍👦"
    },
    {
      number: "50+",
      label: "सम्पन्न कार्यक्रम",
      icon: "🎯"
    },
    {
      number: "10+",
      label: "सहयोगी संस्था",
      icon: "🤝"
    },
    {
      number: "5+",
      label: "वर्षको अनुभव",
      icon: "⭐"
    }
  ];

  return (
    <>
      <SEO 
        title={t("about.title")}
        description={t("about.missionText")}
        keywords="About Jaro Kilo Foundation, Mission, Vision, Values, Team, जरो किलो प्रतिष्ठान बारेमा"
      />
      
      <div className="space-y-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-red-700 via-red-500 to-orange-300 text-white py-20">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <h1 className="text-5xl font-bold mb-6" data-aos="fade-up">
              {t("about.title")}
            </h1>
            <p className="text-xl max-w-3xl mx-auto" data-aos="fade-up" data-aos-delay="200">
              {i18n.language === "np" ? 
                "२०७४ सालदेखि नेपालको सामाजिक विकास, शिक्षा र सांस्कृतिक संरक्षणमा योगदान पुर्याउँदै आएको संस्था" :
                "Since 2074 B.S., contributing to Nepal's social development, education, and cultural preservation"
              }
            </p>
          </div>
        </section>

        {/* Mission, Vision, Values */}
        <section className="max-w-6xl mx-auto px-6 py-2 bg-gradient-to-r from-red-700 via-red-500 to-orange-300">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-white border-l-4 border-yellow-500 rounded-lg shadow-lg" data-aos="fade-up">
              <div className="text-5xl mb-4">🎯</div>
              <h3 className="text-2xl font-bold mb-4 text-red-600">{t("about.mission")}</h3>
              <p className="text-gray-600 leading-relaxed">{t("about.missionText")}</p>
            </div>
            
            <div className="text-center p-8 bg-white border-l-4 border-yellow-500 rounded-lg shadow-lg" data-aos="fade-up" data-aos-delay="200">
              <div className="text-5xl mb-4">👁️</div>
              <h3 className="text-2xl font-bold mb-4 text-red-600">{t("about.vision")}</h3>
              <p className="text-gray-600 leading-relaxed">{t("about.visionText")}</p>
            </div>
            
            <div className="text-center p-8 bg-white border-l-4 border-yellow-500 rounded-lg shadow-lg" data-aos="fade-up" data-aos-delay="400">
              <div className="text-5xl mb-4">💎</div>
              <h3 className="text-2xl font-bold mb-4 text-red-600">{t("about.values")}</h3>
              <p className="text-gray-600 leading-relaxed">{t("about.valuesText")}</p>
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="bg-gradient-to-r from-red-700 via-red-500 to-orange-300 py-16">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div data-aos="fade-right">
                <h2 className="text-4xl font-bold mb-6 text-gray-100">हाम्रो कथा</h2>
                <div className="space-y-4 text-gray-300 leading-relaxed">
                  <p>
                    जरो किलो प्रतिष्ठान नेपालको स्थापना २०७४ सालमा भएको थियो। यो संस्था नेपालको सामाजिक, 
                    शैक्षिक र सांस्कृतिक विकासमा योगदान पुर्याउने उद्देश्यले स्थापना गरिएको हो।
                  </p>
                  <p>
                    हाम्रो मुख्य उद्देश्य "विज्ञानको बुद्धि, प्रविधिको प्रगति । धर्मको विवेक, सहृदयताको सम्बन्ध" 
                    भन्ने आदर्श वाक्यलाई आधार बनाएर समाजमा सकारात्मक परिवर्तन ल्याउनु हो।
                  </p>
                  <p>
                    आजसम्म हामीले विभिन्न क्षेत्रमा काम गरेर हजारौं मानिसहरूको जीवनमा सकारात्मक प्रभाव पारेका छौं।
                  </p>
                </div>
              </div>
              
              <div className="bg-white p-8 border-l-4 border-yellow-500 rounded-lg" data-aos="fade-left">
                <div className="text-center">
                  {/* <div className="text-6xl mb-6">🏛️</div> */}
                  <h3 className="text-2xl font-bold text-red-600 mb-4">
                    "{t("hero.subtitle")}"
                  </h3>
                  <p className="text-red-600 italic">
                    - हाम्रो आदर्श वाक्य
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Achievements */}
        <section className="max-w-6xl mx-auto px-6 py-2 bg-gradient-to-r from-red-700 via-red-500 to-orange-300 rounded-lg">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-gray-100" data-aos="fade-up">हाम्रा उपलब्धिहरू</h2>
            <p className="text-lg text-gray-300" data-aos="fade-up" data-aos-delay="200">
              आजसम्मका हाम्रा मुख्य उपलब्धिहरू
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <div 
                key={index}
                className="text-center p-6 bg-white border-l-4 border-yellow-500 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
                data-aos="fade-up"
                data-aos-delay={index * 200}
              >
                <div className="text-4xl mb-4">{achievement.icon}</div>
                <div className="text-3xl font-bold text-red-600 mb-2">{achievement.number}</div>
                <div className="text-gray-600">{achievement.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Team Section */}
        <section className="bg-gray-50 py-16 bg-gradient-to-r from-red-700 via-red-500 to-orange-300 rounded-lg">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4 text-gray-100" data-aos="fade-up">हाम्रो टोली</h2>
              <p className="text-lg text-gray-300" data-aos="fade-up" data-aos-delay="200">
                अनुभवी र समर्पित व्यक्तिहरूको टोली
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <div 
                  key={index}
                  className="bg-white p-6 border-l-4 border-yellow-500 rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow"
                  data-aos="fade-up"
                  data-aos-delay={index * 200}
                >
                  <div className="text-6xl mb-4">{member.image}</div>
                  <h3 className="text-xl font-bold mb-2 text-gray-800">{member.name}</h3>
                  <p className="text-red-600 font-medium mb-3">{member.position}</p>
                  <p className="text-gray-600 text-sm">{member.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-gradient-to-r from-red-700 via-red-500 to-orange-300 text-white py-16">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold mb-4" data-aos="fade-up">हामीसँग जोडिनुहोस्</h2>
            <p className="text-lg mb-8" data-aos="fade-up" data-aos-delay="200">
              समाजको विकासमा योगदान पुर्याउन हामीसँग सहकार्य गर्नुहोस्
            </p>
            <div className="space-x-4" data-aos="fade-up" data-aos-delay="400">
              <a 
                href="/contact" 
                className="inline-block bg-yellow-300 text-red-600 px-8 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition-colors"
              >
                सम्पर्क गर्नुहोस्
              </a>
              <a 
                href="/programs" 
                className="inline-block border-2 border-yellow-500 text-yellow-500 px-8 py-3 rounded-lg font-semibold hover:bg-yellow-400 hover:text-red-600 transition-colors"
              >
                कार्यक्रमहरू हेर्नुहोस्
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
