import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vuetify from "vite-plugin-vuetify";
import { transformAssetUrls } from "vite-plugin-vuetify";
import eslintPlugin from "@nabla/vite-plugin-eslint";
import VitePluginBrowserSync from "vite-plugin-browser-sync";
import { chunkSplitPlugin } from "vite-plugin-chunk-split";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    cors: true,
    proxy: {
      "/api": {
        target: "https://api.football-data.org/v4/",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
      "/newsapi": {
        target: "https://newsapi.org/v2/top-headlines",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/newsapi/, ""),
      },
      "/weatherapi": {
        target: "https://api.openweathermap.org/data/2.5/weather",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/weatherapi/, ""),
      },
    },
  },
  build: {
    //target: 'es2015',
    target: "es2017",
    // minify: "esbuild",
    cssTarget: "chrome79",
    minify: "terser",
    reportCompressedSize: true,
    chunkSizeWarningLimit: 5000,
    terserOptions: {
      compress: {
        drop_console: false,
        pure_funcs: ["console.log", "console.info"],
        drop_debugger: true,
        toplevel: false,
      },
    },
    assetsDir: "static/assets",
    rollupOptions: {
      output: {
        chunkFileNames: "static/js/[name]-[hash].js",
        entryFileNames: "static/js/[name]-[hash].js",
        assetFileNames: "static/[ext]/[name]-[hash].[ext]",
      },
    },
  },
  base: "./",
  plugins: [
    chunkSplitPlugin(),
    vue({
      template: { transformAssetUrls },
    }),
    vuetify({ autoImport: true }),
    eslintPlugin(),
    VitePluginBrowserSync(),
  ],
});
