import React from "react";

export default function AboutPage() {
  return (
    <div className="max-w-5xl  mx-auto p-4 space-y-8">
      <h1 className="text-4xl bg-red-500 rounded-xl font-bold text-center animate-fadeIn p-2">हाम्रो बारेमा</h1>
      <section className="flex flex-col md:flex-row gap-6 items-center bg-gradient-to-r from-red-500 via-red-300 to-orange-100">
        <img src="/src/assets/images/about.jpg" className="w-full md:w-1/2 rounded shadow" alt="About" />
        <p className="md:w-1/2 text-gray-700 text-lg">
          Jaro Kilo Foundation Nepal was established in 2074 B.S. Our mission is social development,
          cultural preservation, and educational initiatives across Nepal. We conduct programs,
          workshops, and events to uplift communities.
        </p>
      </section>
    </div>
  );
}
