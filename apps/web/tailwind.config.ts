import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Publeca brand — pink (primary, matches the logo) + blue accent.
        brand: {
          50: "#fff0f6",
          100: "#ffd9e8",
          200: "#ffb0cf",
          300: "#ff7aac",
          400: "#ff3d86",
          500: "#ff0066", // primary (logo pink)
          600: "#e6005c",
          700: "#bd004c",
          800: "#99003d",
          900: "#7a0033",
        },
        accent: {
          50: "#eef0ff",
          100: "#e0e3ff",
          200: "#c7ccff",
          300: "#a3a8ff",
          400: "#817bff",
          500: "#635bff", // blue
          600: "#5a45f0",
          700: "#4d36cf",
          800: "#3f2ea7",
          900: "#372d84",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-sans)", "system-ui", "sans-serif"],
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out both",
      },
    },
  },
  plugins: [],
} satisfies Config;
