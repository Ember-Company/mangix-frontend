import Events from "../../utils/Events.js"
import {loginAdmin} from "../../services/auth.js"

export default class LoginPages {
  static admin() {
    const email=document.getElementById("email")
    const password=document.getElementById("password")
    const button=document.getElementById("button")

    console.log(email)
    if (email.value===''|| password.value=== ''){
      return
    }

    button.addEventListener ("click", async(e)=>{
      e.preventDefault()
      const data= await loginAdmin (email.value, password.value)
      console.log(data)
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

