import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  build: {
    outDir: 'dist',  // Default output folder, ensure it's set to dist
  },
  plugins: [react()],
  server: {
    proxy: {
      "/wp": {
        target: "https://jarokilo.org.np",  // Proxy requests in dev to your WP backend
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/wp/, ""),
      },
    },
  },
  define: {
    // Define a global variable based on environment
    "process.env.VITE_API_URL": JSON.stringify(
      process.env.NODE_ENV === 'production' 
        ? 'https://jarokilo.org.np' 
        : 'http://localhost:3000' // Adjust your dev URL accordingly
    ),
  },
});
