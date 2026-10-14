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
      // Motion tokens (playbook §10.3). Entrances use the long "expo out" curve, exits the
      // short in-out curve. The reduced-motion block in globals.css switches all of it off,
      // and the server always renders the finished state.
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(.16, 1, .3, 1)",
        exit: "cubic-bezier(.4, 0, .6, 1)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "word-in": {
          "0%": { opacity: "0", transform: "translateY(105%)", filter: "blur(3px)" },
          "100%": { opacity: "1", transform: "translateY(0)", filter: "blur(0)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "aura-drift": {
          "0%, 100%": { transform: "translate3d(0, 0, 0) scale(1)" },
          "50%": { transform: "translate3d(-3%, 2%, 0) scale(1.06)" },
        },
        "spine-pulse": {
          "0%": { transform: "translateY(0)", opacity: "0" },
          "15%": { opacity: "1" },
          "85%": { opacity: "1" },
          "100%": { transform: "translateY(calc(var(--dist) * -1))", opacity: "0" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s cubic-bezier(.16, 1, .3, 1) both",
        "word-in": "word-in 0.68s cubic-bezier(.16, 1, .3, 1) both",
        marquee: "marquee 36s linear infinite",
        "aura-drift": "aura-drift 14s ease-in-out infinite",
        "spine-pulse": "spine-pulse 1.4s cubic-bezier(.4, 0, .6, 1) infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;
