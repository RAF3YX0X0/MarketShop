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
          50: "#fdf8f4",
          100: "#faefe6",
          200: "#f5ddcd",
          300: "#eec1a4",
          400: "#e59e74",
          500: "#dc7949",
          600: "#ce5d34",
          700: "#ab472b",
          800: "#893b27",
          900: "#6f3323",
          950: "#3c170f",
        },
        navy: {
          800: "#1e293b",
          900: "#0f172a",
          950: "#080c15",
        },
        cream: {
          50: "#fdfcfa",
          100: "#fbf9f4",
          200: "#f6f1e7",
          300: "#ece2ce",
          400: "#ded0b0",
        },
        sage: {
          50: "#f4f7f4",
          100: "#e5ece5",
          600: "#2d6a4f",
          700: "#1b4332",
          800: "#081c15",
        }
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "Playfair Display", "Georgia", "serif"],
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
        display: ["var(--font-lora)", "Lora", "serif"],
      },
      boxShadow: {
        'book': '0 15px 35px -5px rgba(0, 0, 0, 0.2), 0 5px 15px rgba(0, 0, 0, 0.08)',
        'book-lg': '0 20px 40px -10px rgba(0, 0, 0, 0.25), 0 10px 20px rgba(0, 0, 0, 0.1)',
        'card-hover': '0 20px 30px -10px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'pulse-subtle': 'pulseSubtle 3s infinite ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(12px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.92', transform: 'scale(1.02)' },
        }
      }
    },
  },
  plugins: [],
};

export default config;
