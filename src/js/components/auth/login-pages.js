import Events from "../../utils/Events.js";
import { loginAdmin } from "../../services/auth.js";
import { navigate } from "../../utils/navigate.js";
import { toPage } from "../../utils/route-builder.js";
import { PageLoader } from "../loading.js";

const isFormLoading = (condition) => {
  const button = document.getElementById("button");
  let retainBtnText = "ENTRAR";

  if (condition) {
    button.disabled = true;
    button.innerText = "Loading...";
  } else {
    button.disabled = false;
    button.innerText = retainBtnText;
  }
};

export default class LoginPages {
  static admin() {
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const button = document.getElementById("button");
    const errorLogin = document.getElementById("authError");

    Events.$click(button, async () => {
      if (email.value === "" || password.value === "") {
        return;
      }

      isFormLoading(true);
      const { error } = await loginAdmin(email.value, password.value);

      if (!error) {
        navigate(toPage("dashboard"));
      }

      isFormLoading(false);
      errorLogin.classList.remove("hide");
      if (error.name === "AuthApiError") {
        errorLogin.innerText = "Login/Senha invalido";
      }
    });
  }

  static colaborador() {
    console.log("Colaborator Login Page");
  }

  static ponto() {
    console.log("Bater Ponto");
  }
}
