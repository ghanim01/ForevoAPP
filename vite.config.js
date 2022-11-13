import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vuetify from "vite-plugin-vuetify";
import { transformAssetUrls } from "vite-plugin-vuetify";
import eslintPlugin from "@nabla/vite-plugin-eslint";
import VitePluginBrowserSync from "vite-plugin-browser-sync";
import { splitVendorChunkPlugin } from "vite";

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
    //target: 'es2015',
    target: "es2017",
    // minify: "esbuild",
    cssTarget: "chrome79",
    minify: "terser",
    brotliSize: false,
    chunkSizeWarningLimit: 5000,
    terserOptions: {
      compress: {
        drop_console: false,
        pure_funcs: ["console.log", "console.info"],
        drop_debugger: true,
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
    splitVendorChunkPlugin(),
    vue({
      template: { transformAssetUrls },
    }),
    vuetify({ autoImport: true }),
    eslintPlugin(),
    VitePluginBrowserSync(),
  ],
});
