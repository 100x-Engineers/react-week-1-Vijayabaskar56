import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// vite.config.js
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve("index.html"),
        nested: resolve("index.html"),
      },
    },
  },
});
