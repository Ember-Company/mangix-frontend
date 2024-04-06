import { btnSalvar, btnBuscar, inputDeNome } from "./dom.js";
import { eventoBuscarDados, eventoSalvarDados } from "./eventos.js";

// camel case - btnSalvarDados(), btnAmostrarAlerta() - javascript, C++, Java, C#
// snake case - btn_salvar_dados(), btn_amostrar_alerta() - C, python, C++, (as vezes) javascript
// Pascal case - BtnSalvarDados(), BtnAmostrarAlerta() - Pascal, Classes

btnSalvar.addEventListener("click", eventoSalvarDados);
btnBuscar.addEventListener("click", eventoBuscarDados);
