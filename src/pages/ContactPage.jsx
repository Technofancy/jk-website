import React from "react";

export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto p-4 space-y-8">
      <h1 className="bg-red-500 rounded-xl text-4xl font-bold text-center animate-fadeIn p-2">हाम्रो सम्पर्क</h1>
      <form className="bg-gradient-to-r from-red-500 via-red-300 to-orange-100 p-6 rounded shadow space-y-4">
        <input className="w-full border p-2 rounded" type="text" placeholder="Name" required />
        <input className="w-full border p-2 rounded" type="email" placeholder="Email" required />
        <textarea className="w-full border p-2 rounded" placeholder="Message" rows="5" required></textarea>
        <button className="bg-red-700 text-white px-4 py-2 rounded hover:bg-red-600 transition">पठाउनुहोस्</button>
      </form>
    </div>
  );
}
