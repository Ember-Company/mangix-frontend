import { defineConfig } from "vite";
import fs from "fs";
import path from "path";

async function extractPageRoutes(appDir) {
  let input = {};

  const traverse = async (dir) => {
    try {
      const folders = await fs.promises.readdir(dir, { withFileTypes: true });

      for (const folder of folders) {
        const route = path.join(dir, folder.name);

        folder.isDirectory() && (await traverse(route));

        const key = folder.name.split(".")[0];
        input[key] = path.relative(appDir, route);
      }
    } catch (error) {
      console.log(error);
    }
  };

  await traverse(appDir);
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
      input: await extractPageRoutes("app"),
    },
  },
});
