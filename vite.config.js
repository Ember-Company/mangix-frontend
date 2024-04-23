import { defineConfig } from "vite";

export default defineConfig({
  build: {
    outDir: "dist",
    rollupOptions: {
      input: {
        home: "/index.html",
        users: "/app/users-list/users.html",
      },
    },
  },
});
