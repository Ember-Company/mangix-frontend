import { defineConfig } from "vite";

export default defineConfig({
  build: {
    outDir: "dist",
    rollupOptions: {
      input: {
        home: "./index.html",
        users: "./src/pages/users-list/users.html",
      },
    },
  },
});
