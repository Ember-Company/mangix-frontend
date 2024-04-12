import { defineConfig } from "vite";
import Pages from "vite-plugin-pages";

const assetsPath = "./assets";

export default defineConfig({
  resolve: {
    alias: {
      "@assets": assetsPath,
    },
  },
  define: {
    __ASSETS_PATH__: JSON.stringify(assetsPath),
  },
  plugins: [Pages()],
  build: {
    outDir: "dist",
    assetsDir: assetsPath,
    sourcemap: true,
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
      },
    },
  },
});
