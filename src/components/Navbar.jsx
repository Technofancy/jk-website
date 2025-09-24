import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/JK_pratisthanLogo.png";

export default function Navbar({ className = "" }) {
  const [open, setOpen] = useState(false);
  const links = [
    { label: "गृह", to: "/" },
    { label: "हाम्रो बारेमा", to: "/about" },
    { label: "कार्यक्रम", to: "/programs" },
    { label: "प्रेस विज्ञप्ति", to: "/press" },
    { label: "पुस्तक", to: "/books" },
    { label: "समाचार", to: "/news" },
    { label: "संग्रह", to: "/gallery" },
    { label: "सम्पर्क", to: "/contact" },
  ];

  return (
    // give the navbar a fixed height (h-16 = 4rem). keep className so App can pass fixed positioning.
    <nav className={`bg-red-700 text-white px-4 h-16 flex items-center justify-between w-screen ${className}`}>
      <Link to="/" className="flex items-center gap-3 text-2xl font-bold cursor-pointer z-50">
        <img src={logo} alt="Jaro Kilo Foundation logo" className="h-10 w-auto rounded sm:h-12" />
        <div className="flex flex-col text-center">
        <span className="whitespace-normal text-sm sm:text-base md:text-lg lg:text-xl text-center">जरो किलो प्रतिष्ठान नेपाल </span>
        {/* <span className="text-xs tracking-tighter italic">विज्ञानको बुद्धि, प्रविधिको प्रगति । धर्मको विवेक, सहृदयताको सम्बन्ध ॥</span> */}
        </div>
      </Link>

      {/* Desktop menu */}
      <div className="hidden md:flex space-x-4">
        {links.map((l) => (
          <Link
            key={l.to}
            to={l.to}
            className="hover:text-yellow-300 transition"
          >
            {l.label}
          </Link>
        ))}
      </div>

      {/* Mobile menu button */}
      <div className="md:hidden">
        <button onClick={() => setOpen(!open)}>☰</button>
      </div>

      {/* Mobile dropdown - position absolute so it doesn't push/overlap page content */}
      {open && (
        <div className="absolute top-16 left-0 right-0 z-40 md:hidden mt-0 bg-red-600 p-2 rounded-b shadow">
          <div className="flex flex-col space-y-2">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="hover:text-yellow-300 transition px-4 py-2"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
