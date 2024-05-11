import { defineConfig } from "vite";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import { log } from "console";

dotenv.config();

const baseURL = process.env.VITE_APP_BASE_PREFIX || "http://localhost:5173/";

async function extractPageRoutes(appDir) {
  let input = {};
  let proxy = {};

  const writeProxy = (relativePath) => {
    return {
      target: relativePath,
      rewrite: async (url) => {
        const { pathname, search } = new URL(url);

        if (pathname.startsWith("/app/") && !pathname.endsWith(".html")) {
          const routePath = pathname.replace(/^\/app\//, "");

          return {
            path: routePath,
            search,
          };
        }

        return undefined;
      },
    };
  };

  const traverse = async (dir) => {
    try {
      const folders = await fs.promises.readdir(dir, { withFileTypes: true });

      for (const folder of folders) {
        const route = path.join(dir, folder.name);

        folder.isDirectory() && (await traverse(route));

        const definedRoute = `/app/${path.relative(appDir, route)}/`;
        if (definedRoute.endsWith(".html")) {
          return;
        }

        const key = folder.name.split(".")[0];

        input[key] = definedRoute;
        proxy[definedRoute] = writeProxy(definedRoute);
      }
    } catch (error) {
      console.error(error);
    }
  };

  await traverse(appDir);
  return { input, proxy };
}

async function createViteConfig() {
  const { input, proxy } = await extractPageRoutes("app");

  return defineConfig({
    build: {
      server: {
        middlewareMode: "ssr",
        proxy: {
          ...proxy,
          "/": {
            target: baseURL,
          },
        },
      },

      outDir: "dist",
      rollupOptions: {
        input,
      },
    },
  });
}

export default createViteConfig();
