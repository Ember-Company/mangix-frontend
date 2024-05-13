import Events from "../../utils/Events.js";
import { toPage } from "../../utils/route-builder.js";
import { notAuthorizedScreen } from "../error-screens.js";
import LoginPages from "./login-pages.js";
import SessionManager from "./session.js";

export default class AuthHandler {
  constructor() {
    this.loginRole = null;
    this.sessionManager = new SessionManager();
    this.currentUrl = window.location.href.split("/");
    this.navigate = (url) => window.location.assign(url);
    this.init();
  }

  async init() {
    const sessionExists = await this.sessionManager.validateSession();

    if (!sessionExists && !this.isAuthPage()) {
      notAuthorizedScreen();
      return;
    }

    if (sessionExists) {
      !this.isHomePage() && this.navigate(toPage("dashboard"));

      return;
    }

    this.handleLogin();
  }

  handleLogin() {
    Events.$onPageLoad(() => {
      console.log("test");
      const pageOptions = {
        adm: LoginPages.admin,
        colaborador: LoginPages.colaborador,
        ponto: LoginPages.ponto,
      };

      const currentLocation = this.currentUrl[5];

      for (const [key, action] of Object.entries(pageOptions)) {
        if (currentLocation.includes(key)) {
          action();
        }
      }
    });
  }

  isAuthPage() {
    try {
      return this.currentUrl[4].includes("auth");
    } catch (error) {
      return false;
    }
  }

  isHomePage() {
    try {
      return (
        !this.currentUrl[this.currentUrl.length - 1].includes("/") &&
        !this.isAuthPage()
      );
    } catch (error) {
      return false;
    }
  }
}

new AuthHandler();
