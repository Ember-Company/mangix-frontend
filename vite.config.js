import { defineConfig } from "vite";

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
      input: {
        home: "/index.html",
        users: "/app/users/",
        accessPermissions: "/app/access/permissions/",
        accessRoles: "/app/access/roles/",
      },
    },
  },
});
