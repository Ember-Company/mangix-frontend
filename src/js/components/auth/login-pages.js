import Events from "../../utils/Events.js"
import {loginAdmin} from "../../services/auth.js"
import { navigate } from "../../utils/navigate.js"
import { toPage } from "../../utils/route-builder.js"

export default class LoginPages {
  static admin() {
    const email=document.getElementById("email")
    const password=document.getElementById("password")
    const button=document.getElementById("button")
    const errorLogin=document.getElementById("authError")

    console.log(email)
    

    button.addEventListener ("click", async(e)=>{
      e.preventDefault()
      if (email.value===''|| password.value=== ''){
        return
      }
      const {data,error}= await loginAdmin (email.value, password.value)
      if(error){
        console.log(errorLogin)
        errorLogin.classList.remove ("hide")
        if (error.name === 'AuthApiError'){
          errorLogin.innerText = "Login/Senha invalido"
        } 
      } else {
        navigate(toPage("dashboard"));
      }
      console.log(error)
    })

    console.log("Admin Login Page");
  }

  static colaborador() {
    console.log("Colaborator Login Page");
  }

  static ponto() {
    console.log("Bater Ponto");
  }
}

