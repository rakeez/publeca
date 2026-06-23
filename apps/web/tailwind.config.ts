import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Publeca brand — deep indigo/violet, Stripe-adjacent but its own identity
        brand: {
          50: "#eef0ff",
          100: "#e0e3ff",
          200: "#c7ccff",
          300: "#a3a8ff",
          400: "#817bff",
          500: "#635bff",
          600: "#5a45f0",
          700: "#4d36cf",
          800: "#3f2ea7",
          900: "#372d84",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
