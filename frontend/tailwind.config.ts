import type { Config } from "tailwindcss";
import { nextui } from "@nextui-org/react";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [
    nextui({
      themes: {
        light: {
          layout: {},
          colors: {
            background: "#E9E8E8",
            foreground: "#000000",
            divider: "#4b5563",
            overlay: "#ffffff",
            primary: "#8758ff",
            focus: "#4b556333",
          },
        },
        dark: {
          layout: {},
          colors: {
            background: "#181818",
            foreground: "#ffffff",
            overlay: "#050505",
            primary: "#8758ff",
            focus: "#ffffff33",
          },
        },
      },
    }),
  ],
};
export default config;
