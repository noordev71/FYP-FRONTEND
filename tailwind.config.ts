import type { Config } from "tailwindcss";
import forms from "@tailwindcss/forms";
import scrollbar from "tailwind-scrollbar";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        "space-grotesk": ["var(--font-space-grotesk)", "sans-serif"],
      },
      colors: {
        primary_dark: "#0C630C",
        primary: "#e6f85e",
        dark: "#11121C",
        blue: "#171825",
        borderColor: "#2e2f45",
        lightGray: "#bdbfd4",
      },
    },
  },
  plugins: [forms, scrollbar],
};

export default config;
