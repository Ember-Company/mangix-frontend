import { toPage, loadPage } from "../utils/route-builder.js";

const main_routes = [
  {
    id: 1,
    title: "Dashboard",
    icon: '<i class="menu-icon tf-icons bx bx-home-circle"></i>',
    path: `${import.meta.env.VITE_APP_BASE_PREFIX}`,
  },
  {
    id: 2,
    title: "Funcionários",
    icon: '<i class="menu-icon tf-icons bx bx-user"></i>',
    path: toPage("funcionarios/"),
  },
  {
    id: 3,
    title: "Roles & Permissions",
    icon: '<i class="menu-icon tf-icons bx bx-check-shield"></i>',
    submenus: [
      {
        id: 1,
        title: "Roles",
        path: toPage("access/roles/"),
      },
      {
        id: 2,
        title: "Permissions",
        path: toPage("access/permissions/"),
      },
    ],
  },
  {
    id: 4,
    title: "Account",
    icon: '<i class="menu-icon tf-icons bx bxs-user-account"></i>',
    path: toPage("account-settings/"),
  },
  {
    id: 5,
    title: "Pagina Demo",
    icon: '<i class="menu-icon tf-icons bx bxs-file-html"></i>',
    path: toPage("demo-page/"),
  },
  {
    id: 6,
    title: "Pagina Login",
    icon: '<i class="menu-icon tf-icons bx bxs-file-html"></i>',
    path: toPage("login/"),
  },
  {
    id: 7,
    title: "Pagina testerrr",
    icon: '<i class="menu-icon tf-icons bx bxs-file-html"></i>',
    path: toPage("testefodase/"),
  },
  {
    id: 8,
    title: "Pontos Registrados",
    icon: '<i class="menu-icon tf-icons bx bxs-file-html"></i>',
    path: toPage("ponto/"),
  },
];

export const sidebarMapConfig = {
  main: main_routes,
};


