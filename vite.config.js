import { defineConfig } from "vite";
import fs from "fs";

function extractPageRoutes() {
  let input = {};
  const folders = fs.readdirSync("app", { withFileTypes: true });

  folders.forEach((folder) => {
    if (folder.isDirectory()) {
      const folderName = folder.name;
      input[folderName] = `/app/${folderName}/`;
    }
  });

  return input;
}

export default defineConfig({
  build: {
    server: {
      middlewareMode: "ssr",
      rewrite: async (url) => {
        const { pathname, search } = new URL(url);
        if (pathname.startsWith("/app/") && !pathname.endsWith(".html")) {
          return { path: "/app/index.html", search };
        }
        return undefined;
      },
    },
    outDir: "dist",
    rollupOptions: {
      ...extractPageRoutes(),
    },
  },
});
