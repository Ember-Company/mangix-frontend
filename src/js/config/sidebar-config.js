import { toPage, loadPage } from "../utils/route-builder.js";

const main_routes = [
  {
    id: 1,
    title: "Dashboard",
    icon: '<i class="menu-icon tf-icons bx bx-home-circle"></i>',
    path: `${import.meta.env.VITE_APP_BASE_PREFIX}/index.html`,
  },
  {
    id: 2,
    title: "Users",
    icon: '<i class="menu-icon tf-icons bx bx-user"></i>',
    path: toPage("users/index.html"),
  },
  {
    id: 3,
    title: "Roles & Permissions",
    icon: '<i class="menu-icon tf-icons bx bx-check-shield"></i>',
    submenus: [
      {
        id: 1,
        title: "Roles",
        path: toPage("access/app-access-roles.html"),
      },
      {
        id: 2,
        title: "Permissions",
        path: toPage("access/app-access-permission.html"),
      },
    ],
  },
  {
    id: 4,
    title: "Account",
    icon: '<i class="menu-icon tf-icons bx bxs-user-account"></i>',
    path: toPage("users/pages-account-settings-account.html"),
  },
];

export const sidebarMapConfig = {
  main: main_routes,
};
