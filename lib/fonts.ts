import { IBM_Plex_Sans_Arabic, Plus_Jakarta_Sans } from "next/font/google";

// Each language layout only uses its own font, so Arabic pages never download
// the Latin font family and English pages never download the Arabic one.
export const arabicFont = IBM_Plex_Sans_Arabic({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-ar",
});

export const englishFont = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-en",
});
