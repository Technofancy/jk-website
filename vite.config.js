import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/wp": {
        target: "https://jarokilo.org.np",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/wp/, ""),
      },
    },
  },
});
