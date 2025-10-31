import { ad2bs } from "ad-bs-converter";

// Helper to convert English digits to Devanagari
const toDevanagari = (text) => {
  if (text === undefined || text === null) return "";
  const englishNumerals = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  const nepaliNumerals = ["०", "१", "२", "३", "४", "५", "६", "७", "८", "९"];
  let newText = String(text);
  for (let i = 0; i < 10; i++) {
    newText = newText.replace(new RegExp(englishNumerals[i], "g"), nepaliNumerals[i]);
  }
  return newText;
};

export const convertToNepaliDate = (adDate) => {
  if (!adDate) {
    return "";
  }

  try {
    let dateObj;

    // Handle DD/MM/YYYY format
    if (typeof adDate === "string" && /^\d{1,2}\/\d{1,2}\/\d{4}$/.test(adDate)) {
      const [day, month, year] = adDate.split("/").map((n) => parseInt(n, 10));
      dateObj = new Date(year, month - 1, day);
    }
    // Handle YYYYMMDD format from ACF
    else if (typeof adDate === "string" && /^\d{8}$/.test(adDate)) {
      const year = parseInt(adDate.substring(0, 4), 10);
      const month = parseInt(adDate.substring(4, 6), 10) - 1;
      const day = parseInt(adDate.substring(6, 8), 10);
      dateObj = new Date(year, month, day);
    } else {
      // For other formats like ISO strings
      dateObj = new Date(adDate);
    }

    if (isNaN(dateObj.getTime())) {
      console.error("Invalid date object created from input:", adDate);
      return "Invalid Date";
    }

    // Convert Date object → "YYYY/MM/DD" string for ad2bs
    const yyyy = dateObj.getFullYear();
    const mm = String(dateObj.getMonth() + 1).padStart(2, "0");
    const dd = String(dateObj.getDate()).padStart(2, "0");
    const adString = `${yyyy}/${mm}/${dd}`;

    const bsDate = ad2bs(adString);

    const year = toDevanagari(bsDate.ne.year);
    const day = toDevanagari(bsDate.ne.day);
    const month = bsDate.ne.strMonth; // Month name is already in Nepali

    return `${day} ${month}, ${year}`;
  } catch (error) {
    console.error("Error in ad-bs-converter for date:", adDate, error);
    return "Invalid Date";
  }
};
