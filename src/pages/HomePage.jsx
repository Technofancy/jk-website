import React from "react";
import Hero from "../components/Hero";

export default function HomePage() {

  // function to convert English numbers to Nepali numbers
  const toNepaliNumber = (num) => {
  const nepaliDigits = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'];
  return num.toString().split('').map(d => nepaliDigits[parseInt(d)]).join('');
};

  return (
    <div className="space-y-16">
      {/* Hero */}
      <Hero />
      
      {/* Mission Statement */}
      <section className="max-w-6xl bg-gradient-to-r from-red-500 via-red-300 to-orange-100 mx-auto p-6 rounded shadow-lg">
        <h2 className="text-3xl font-semibold mb-4">हाम्रो उद्देश्य</h2>
        <p>
          Jaro Kilo Foundation is dedicated to cultural preservation, education, and
          community development. Explore our programs, publications, and news to
          stay connected with our journey.
        </p>
      </section>

      {/* About Section */}
      <section className="max-w-6xl bg-gradient-to-r from-red-500 via-red-300 to-orange-100 mx-auto p-6 rounded shadow-lg">
        <h2 className="text-3xl font-semibold mb-4">हाम्रो बारेमा</h2>
        <p>We focus on social development, education, and cultural preservation in Nepal.</p>
      </section>

      {/* Programs Preview, number converter function called */}
      <section className="max-w-6xl bg-gradient-to-r from-red-500 via-red-300 to-orange-100 mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
  {[1, 2, 3].map((i) => (
    <div key={i} className="bg-red-100 p-4 rounded shadow hover:scale-105 transition">
      <h3 className="font-bold text-xl mb-2">कार्यक्रम-{toNepaliNumber(i)}</h3>
      <p>कार्यक्रमको छोटो विवरण...</p>
    </div>
  ))}
</section>


      {/* Call to Action */}
      {/* <section className="bg-red-300 text-white text-center p-12 rounded animate-pulse">
        <h2 className="text-2xl font-bold mb-4">Join Us in Making a Difference</h2>
        <button className="bg-yellow-400 text-black px-6 py-2 rounded font-semibold hover:bg-yellow-300 transition">
          Donate / Participate
        </button>
      </section> */}
    </div>
  );
}
