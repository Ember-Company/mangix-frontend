import { toPage } from "../../utils/route-builder.js";
import ErrorPage from "../error-screens.js";
import { PageLoader } from "../loading.js";
import LoginPages from "./login-pages.js";
import SessionManager from "./session.js";
import Events from "./../../utils/Events.js";

export default class AuthHandler {
  constructor() {
    this.sessionManager = new SessionManager();

    this.currentUrl = window.location.href.split("/");
    this.navigate = (url) => window.location.assign(url);

    this.init();
  }

  init() {
    Events.$onPageLoad(async () => {
      const sessionExists = await this.sessionManager.validateSession();

      if (sessionExists) {
        if (!this.isAuthPage() || !this.isHomePage()) {
          PageLoader.disable();

          document
            .querySelector(".content-body div:nth-child(3)")
            .classList.remove("hide");

          return;
        }

        this.navigate(toPage("dashboard"));
      } else {
        if (!this.isHomePage() && !this.isAuthPage()) {
          ErrorPage.notAuthorized();
          return;
        }

        !this.isAuthPage() && this.navigate(toPage("auth/login-adm"));
      }

      this.handleLogin();
    });
  }

  handleLogin() {
    const currentLocation = this.currentUrl[5];
    const pageOptions = {
      adm: LoginPages.admin,
      colaborador: LoginPages.colaborador,
      ponto: LoginPages.ponto,
    };

    for (const [key, action] of Object.entries(pageOptions)) {
      if (currentLocation.includes(key)) {
        action();
      }
    }
  }

  isAuthPage() {
    try {
      return this.currentUrl[4].includes("auth");
    } catch (error) {
      return false;
    }
  }

  isHomePage() {
    return this.currentUrl.length < 5;
  }
}

new AuthHandler();
