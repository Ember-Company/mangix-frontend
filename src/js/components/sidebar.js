import { loadPage } from "../utils/route-builder.js";
import { sidebarMapConfig } from "../config/sidebar-config.js";

export default class Sidebar {
  constructor() {
    this.routes = sidebarMapConfig[import.meta.env.VITE_APP_LAYOUT];
    this.sidebar = document.querySelector(".menu-inner");

    this.activeId = this.sidebar.dataset.id;
    this.renderSidebar().handleNavigation();
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

  renderSidebar() {
    this.sidebar.innerHTML = this.routes
      .map((route, _) => {
        return route?.submenus !== undefined
          ? this.renderDropdown(route)
          : this.renderItem(route);
      })
      .join("");

    return this;
  }

  renderItem({ id, title, icon, path, header }, active = false) {
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

  renderDropdown({ id, title, icon, path, submenus }) {
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
            .map((submenu) =>
              this.renderItem(submenu, submenu.id === Number(idList[1]))
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
