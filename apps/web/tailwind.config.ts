import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Publeca brand — pink (primary, matches the logo; also the primary CTA) + violet accent
        // (brand-identity badges and status pills only, never a CTA fill).
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
        // Neutral grayscale from the ClickUp-style system (docs/design-system.md). Named "slate"
        // so every existing slate-* class inherits it: 600 = body copy, 500 = secondary text
        // (kept ≥4.5:1 on white), 200 = the default 1px border, 50 = card surface.
        slate: {
          50: "#f8f9fa", // mist — card surface
          100: "#eeeeee", // mercury — chips, neutral fills
          200: "#e8e8e8", // bone — default border
          300: "#d4d4d4", // cloud — hairlines, inputs
          400: "#9b9b9b", // tertiary text, large only
          500: "#737373", // secondary text
          600: "#646464", // body copy
          700: "#3a3a3a",
          800: "#2a2a2a", // carbon
          900: "#202020", // ink — headlines, dark buttons
          950: "#111111", // dark panel
        },
        onyx: "#090c1d", // display headlines
        band: "#e9ebf0", // section band
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
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "Menlo", "Consolas", "monospace"],
      },
      // Radii: 12px cards, 20px large cards, 9999px for every button, tag and badge.
      borderRadius: {
        "2xl": "0.75rem",
        "3xl": "1.25rem",
      },
      maxWidth: {
        page: "75rem", // 1200px
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
        // A dot running down the hero card's who → what → how rail.
        "rail-flow": {
          "0%": { top: "0%", opacity: "0" },
          "12%": { opacity: "1" },
          "88%": { opacity: "1" },
          "100%": { top: "100%", opacity: "0" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s cubic-bezier(.16, 1, .3, 1) both",
        "word-in": "word-in 0.68s cubic-bezier(.16, 1, .3, 1) both",
        "rail-flow": "rail-flow 1.6s cubic-bezier(.4, 0, .6, 1) both",
      },
    },
  },
  plugins: [],
} satisfies Config;
