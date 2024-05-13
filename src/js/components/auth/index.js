import Events from "../../utils/Events.js";
import { toPage } from "../../utils/route-builder.js";
import ErrorPage from "../error-screens.js";
import { PageLoader } from "../loading.js";
import LoginPages from "./login-pages.js";
import SessionManager from "./session.js";

export default class AuthHandler {
  constructor() {
    this.sessionManager = new SessionManager();

    this.currentUrl = window.location.href.split("/");
    this.navigate = (url) => window.location.assign(url);

    this.init();
  }

  async init() {
    const sessionExists = await this.sessionManager.validateSession();

    if (sessionExists) {
      if (this.isAuthPage()) {
        this.navigate(toPage("dashboard"));
      }

      if (this.isHomePage()) {
        PageLoader.hide();
        document
          .querySelector(".content-body div:nth-child(3)")
          .classList.remove("hide");
        return;
      }
    } else {
      if (this.isAuthPage()) {
        return;
      }

      if (!this.isHomePage()) {
        ErrorPage.notAuthorized();
        // this.errorScreen.notAuthorized();
        return;
      } else {
        this.navigate(toPage("auth/login-adm"));
      }
    }

    this.handleLogin();
  }

  handleLogin() {
    Events.$onPageLoad(() => {
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
    const routeEnd = this.currentUrl[this.currentUrl.length - 1];
    // console.log(routeEnd);

    return routeEnd === "" && !this.isAuthPage();
  }
}

new AuthHandler();
