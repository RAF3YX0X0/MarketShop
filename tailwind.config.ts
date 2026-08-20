import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: {
            50: "#F0F7FB",
            100: "#E2F0F8",
            200: "#C5E1F2",
            300: "#98C9E7",
            400: "#64ACD8",
            500: "#3E8EC5",
            600: "#2B72A6",
            700: "#245C86",
            800: "#224D6F",
            900: "#20425C",
            950: "#152B3C",
          },
          pink: {
            50: "#FDF2F4",
            100: "#FCE5E9",
            200: "#F9CFD7",
            300: "#F4ABB8",
            400: "#EB798F",
            500: "#DD516E",
            600: "#C86458",
            700: "#AB2C4A",
            800: "#8E2740",
            900: "#79253B",
            950: "#440F1D",
          },
          teal: {
            DEFAULT: "#2C4653",
            600: "#2C4653",
            700: "#223843",
          },
          coral: {
            DEFAULT: "#C86458",
            500: "#C86458",
            600: "#B44C40",
          }
        },
        ink: {
          DEFAULT: "#0F172A",
          muted: "#475569",
          subtle: "#64748B",
          border: "#E2E8F0",
        },
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "Merriweather", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "-apple-system", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
      borderRadius: {
        none: "0px",
        subtle: "2px",
        sm: "2px",
        DEFAULT: "2px",
        md: "4px",
        full: "9999px",
      },
      boxShadow: {
        flat: "2px 2px 0px 0px rgba(15, 23, 42, 1)",
        'flat-blue': "2px 2px 0px 0px rgba(62, 142, 197, 1)",
        'flat-pink': "2px 2px 0px 0px rgba(200, 100, 88, 1)",
        subtle: "0 1px 3px 0 rgba(0, 0, 0, 0.05)",
      },
    },
  },
  plugins: [],
};

export default config;
