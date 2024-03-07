import { btnSalvar, btnBuscar } from "./dom.js";
import { eventoBuscarDados, eventoSalvarDados } from "./eventos.js";

btnSalvar.addEventListener("click", eventoSalvarDados);

btnBuscar.addEventListener("click", eventoBuscarDados);
