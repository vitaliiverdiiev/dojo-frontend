import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/dojo-frontend/",
  define: {
    "process.env": {
      VITE_API_URI: process.env.VITE_API_URI,
      VITE_BASE_URL: process.env.VITE_BASE_URL,
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
