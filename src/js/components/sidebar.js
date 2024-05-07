import { sidebarMapConfig } from "../config/sidebar-config.js";

export default class Sidebar {
  constructor() {
    this.routes = sidebarMapConfig[import.meta.env.VITE_APP_LAYOUT];
    this.sidebar = document.querySelector(".menu-inner");

    this.activeId = this.sidebar.dataset.id;
    this.render().handleNavigation();
  }

  handleNavigation() {
    this.sidebar.addEventListener("click", (e) => {
      e.preventDefault();
      const target = e.target.closest("a");

      if (target) {
        const path = target.getAttribute("href");

        path && window.location.assign(path);
      }
    });
  }

  render() {
    this.sidebar.innerHTML = this.routes
      .map((route, _) => {
        console.log(
          "submenus count: ",
          route?.submenus.length || typeof route?.submenus
        );

        return route?.submenus !== undefined
          ? this.dropdown(route)
          : this.item(route);
      })
      .join("");

    return this;
  }

  item({ id, title, icon, path, header }, active = false) {
    const elemIsActive = active || this.isActive(id);

    if (header) {
      return `
      <li class="menu-header small text-uppercase">
        <span class="menu-header-text" data-i18n="${header}"
          >${header}</span
        >
      </li>    
      `;
    }

    return `
      <li class="menu-item ${elemIsActive ? "active" : ""}">
          <a href="${path ?? "#"}" class="menu-link">
            ${icon ?? ""}
            <div class="text-truncate" data-i18n="${title}">
              ${title}
            </div>
          </a>
        </li>
    `;
  }

  dropdown({ id, title, icon, path, submenus }) {
    const idList = this.activeId.split("-");
    const active = id === Number(idList[0]);

    return `
      <li class="menu-item ${active ? "active open" : ""}">
        <a href="${path ?? "#"}" class="menu-link menu-toggle">
          ${icon ?? ""}
          <div class="text-truncate" data-i18n="${title}">
            ${title}
          </div>
        </a>
        <ul class="menu-sub">
          ${submenus
            ?.map((submenu) =>
              this.item(submenu, submenu.id === Number(idList[1]))
            )
            .join("")}
        </ul>
      </li>
    `;
  }

  isActive(id) {
    return id === Number(this.activeId);
  }
}
