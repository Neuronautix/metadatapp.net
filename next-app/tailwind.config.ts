import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./content/**/*.{md,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        "mapp-primary": "#0f8ce2",
        "mapp-accent": "#0bcf9c",
        "mapp-ghost": "#0f172a"
      }
    }
  },
  plugins: []
};

export default config;
