import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "./packages/ui/**/*.{js,ts,jsx,tsx}", //de
    "../../packages/**/*.{js,ts,jsx,tsx}", //para
    "./ui/**/*.{ts,tsx}",
  ],
};

export default config;
