import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}", "./content/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: "1.25rem", md: "2rem", lg: "2.5rem" },
      screens: { "2xl": "1280px" },
    },
    extend: {
      colors: {
        // Brand colours are taken from the Saad Jamal logo: ink black + deep crimson.
        ink: {
          50: "#f6f6f7",
          100: "#e9e9eb",
          200: "#d0d0d4",
          300: "#a8a8af",
          400: "#76767f",
          500: "#555560",
          600: "#3c3c45",
          700: "#2a2a31",
          800: "#1c1c21",
          900: "#121216",
          950: "#0a0a0c",
        },
        crimson: {
          50: "#fdf2f4",
          100: "#fbe5e9",
          200: "#f6c9d1",
          300: "#ee9eac",
          400: "#e06880",
          500: "#c93a58",
          600: "#a81d3d",
          700: "#8f0f2c", // logo red
          800: "#770d27",
          900: "#5f0b20",
          950: "#38040f",
        },
        stone: {
          50: "#faf9f7",
          100: "#f4f2ee",
          200: "#e8e4dd",
          300: "#d6d0c5",
        },
      },
      fontFamily: {
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-body)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(10,10,12,.04), 0 12px 32px -12px rgba(10,10,12,.14)",
        lift: "0 2px 4px rgba(10,10,12,.06), 0 24px 48px -16px rgba(10,10,12,.28)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(18px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up .7s cubic-bezier(.2,.7,.2,1) both",
      },
    },
  },
  plugins: [],
};

export default config;
