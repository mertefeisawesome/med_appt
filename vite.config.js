import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// For advanced CSS extraction/minification
import viteCompression from "vite-plugin-compression";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), viteCompression({ algorithm: "gzip" })],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    minify: "esbuild", // Fast JS minification (default)
    cssCodeSplit: true, // Extract CSS into separate files (default)
    sourcemap: false, // Don’t generate source maps for production
    rollupOptions: {
      output: {
        manualChunks: undefined, // Let Vite optimize chunk splitting
      },
    },
    // Advanced: Custom terser config (rarely needed)
    // terserOptions: { compress: { drop_console: true } },
  },
  css: {
    // Advanced: Customize PostCSS or CSS minification
    postcss: {},
  },
});
