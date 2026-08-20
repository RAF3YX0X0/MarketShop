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
          teal: {
            DEFAULT: "#2C4653",
            50: "#F2F6F8",
            100: "#E1EBEE",
            200: "#C3D7DC",
            300: "#9BBEC6",
            400: "#6A9DAA",
            500: "#447A8A",
            600: "#2C4653",
            700: "#223843",
            800: "#1A2B33",
            900: "#121E24",
            950: "#0B1317",
          },
          coral: {
            DEFAULT: "#C86458",
            50: "#FCF5F4",
            100: "#F8E7E5",
            200: "#F1CEC9",
            300: "#E7AEA6",
            400: "#D9887D",
            500: "#C86458",
            600: "#B44C40",
            700: "#953B30",
            800: "#7C3229",
            900: "#672C25",
            950: "#38130F",
          },
        },
        ink: {
          DEFAULT: "#0F172A",
          muted: "#475569",
          subtle: "#64748B",
          border: "#E2E8F0",
        },
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "-apple-system", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
      borderRadius: {
        none: "0px",
        subtle: "2px",
        sm: "2px",
        DEFAULT: "2px",
        md: "4px",
      },
      boxShadow: {
        flat: "2px 2px 0px 0px rgba(15, 23, 42, 1)",
        'flat-sm': "1px 1px 0px 0px rgba(15, 23, 42, 1)",
        'flat-lg': "4px 4px 0px 0px rgba(15, 23, 42, 1)",
        'flat-coral': "2px 2px 0px 0px rgba(200, 100, 88, 1)",
        subtle: "0 1px 3px 0 rgba(0, 0, 0, 0.05)",
      },
    },
  },
  plugins: [],
};

export default config;
