import React from "react";
import { Link } from "react-router-dom";
// import logo from "../assets/JK_pratisthanLogo.png";
import fourFoundationPillarImg from "../assets/fourFoundationPillar.jpg"

export default function Hero() {
  return (
    <section className="bg-gradient-to-r from-red-700 via-red-500 to-orange-400 text-white min-h-[90vh] flex flex-col md:flex-row items-center justify-center px-6 md:px-20">
      
      {/* Left content */}
      <div
        className="flex-1 text-center md:text-left space-y-6"
        data-aos="fade-right"
      >
        <h1 className="text-4xl md:text-6xl">
          <span className="">स्वागत गर्दछौँ <span className="text-yellow-300 font-bold text-3xl md:text-5xl">जरो किलो प्रतिष्ठान नेपाल</span>
          </span>
        </h1>
        <p className="text-lg md:text-xl max-w-lg">
          “२०७४ सालदेखि मौलिक रैथाने शिक्षा अनुसन्धान अन्वेषण, संस्कृति संरक्षण र सहृदयतामार्फत् समाजको पुनर्जागरण परिलक्षित ।”
        </p>
        <div className="flex justify-center md:justify-start gap-4">
          <Link
            to="/programs"
            className="bg-yellow-300 text-red-700 px-6 py-3 rounded-lg font-semibold shadow-lg hover:bg-yellow-400 transition"
          >
            कार्यहरु हेर्नुहोस्
          </Link>
          <Link
            to="/about"
            className="border-2 border-yellow-300 text-yellow-300 px-6 py-3 rounded-lg font-semibold hover:bg-yellow-300 hover:text-red-700 transition"
          >
            थप जानकारी
          </Link>
        </div>
      </div>

      {/* Right image/illustration */}
      <div
        className="flex-1 mt-10 md:mt-0 flex justify-center"
        data-aos="fade-left"
      >
        <img
          src={fourFoundationPillarImg}
          alt="Community"
          className="max-w-sm md:max-w-md lg:max-w-lg rounded-xl shadow-2xl animate-fadeIn"
        />
      </div>
    </section>
  );
}
