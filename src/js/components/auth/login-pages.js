import Events from "../../utils/Events.js";
import { loginAdmin } from "../../services/auth.js";
import { navigate } from "../../utils/navigate.js";
import { toPage } from "../../utils/route-builder.js";

export default class LoginPages {
  static admin() {
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const button = document.getElementById("button");
    const errorLogin = document.getElementById("authError");

    console.log(email);

    Events.$click(button, async () => {
      if (email.value === "" || password.value === "") {
        return;
      }

      const { error } = await loginAdmin(email.value, password.value);

      if (!error) {
        navigate(toPage("dashboard"));
      }

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
