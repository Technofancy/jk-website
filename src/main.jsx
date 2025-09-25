import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import "aos/dist/aos.css";
import AOS from "aos";
import "./i18n"; // Initialize i18n

AOS.init();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
