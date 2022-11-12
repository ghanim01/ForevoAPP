import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vuetify from "vite-plugin-vuetify";
import { transformAssetUrls } from "vite-plugin-vuetify";
import eslintPlugin from "@nabla/vite-plugin-eslint";
import VitePluginBrowserSync from "vite-plugin-browser-sync";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "https://api.football-data.org/v4/",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
      "/newsapi": {
        target: "https://newsapi.org/",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/newsapi/, ""),
      },
      "/weatherapi": {
        target: "https://api.openweathermap.org/data/2.5/",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/weatherapi/, ""),
      },
    },
  },
  build: {
    sourcemap: true,
    minify: "esbuild",
  },
  plugins: [
    vue({
      template: { transformAssetUrls },
    }),
    vuetify({ autoImport: true }),
    eslintPlugin(),
    VitePluginBrowserSync(),
  ],
});
