import { toPage } from "../utils/route-builder.js";

const main_routes = [
  {
    id: 1,
    title: "Dashboard",
    icon: '<i class="menu-icon tf-icons bx bx-home-circle"></i>',
    path: `${import.meta.env.VITE_APP_BASE_PREFIX}/dashboard/`,
  },
  {
    id: 2,
    title: "Funcionários",
    icon: '<i class="menu-icon tf-icons bx bx-user"></i>',
    path: toPage("dashboard/funcionarios"),
  },
  {
    id: 3,
    title: "Roles & Permissions",
    icon: '<i class="menu-icon tf-icons bx bx-check-shield"></i>',
    submenus: [
      {
        id: 1,
        title: "Roles",
        path: toPage("dashboard/access/roles"),
      },
      {
        id: 2,
        title: "Permissions",
        path: toPage("dashboard/access/permissions"),
      },
    ],
  },
  {
    id: 4,
    title: "Account",
    icon: '<i class="menu-icon tf-icons bx bxs-user-account"></i>',
    path: toPage("dashboard/account-settings"),
  },
  {
    id: 5,
    title: "Pontos Registrados",
    icon: '<i class="menu-icon tf-icons bx bxs-file-html"></i>',
    path: toPage("dashboard/ponto"),
  },
  {
    id: 100,
    title: "Logout",
    icon: '<i class="menu-icon tf-icons bx bxs-file-html"></i>',
    action: true,
  },
];

export const sidebarMapConfig = {
  main: main_routes,
};
