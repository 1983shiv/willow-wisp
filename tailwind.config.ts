import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "primary": "#d96d7d",
        "primary-hover": "#c65c6b",
        "sage": "#7DAA92",
        "gold": "#D4A76A",
        "gold-hover": "#c2965b",
        "paper-white": "#FFF8F4",
        "soft-charcoal": "#2F2F2F",
        "background-light": "#f8f6f6",
        "background-dark": "#1f1315",
      },
      fontFamily: {
        "display": ["Inter", "sans-serif"]
      },
      borderRadius: { "DEFAULT": "0.25rem", "lg": "0.5rem", "xl": "0.75rem", "full": "9999px" },
    },
  },
  plugins: [],
};
export default config;