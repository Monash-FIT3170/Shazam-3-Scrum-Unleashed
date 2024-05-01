import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "tailwindcss";
import { BASE_PATH } from "./src/pages/PagePaths";

// https://vitejs.dev/config/
export default defineConfig({
  base: BASE_PATH,
  plugins: [react()],
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
});
