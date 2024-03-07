import { inputDeNome, verNome } from "./dom.js";
import { Storage } from "./storage.js";

export function eventoSalvarDados(evento) {
  evento.preventDefault();

  const nome = inputDeNome.value;
  Storage.salvar(nome);
}

export function eventoBuscarDados(evento) {
  evento.preventDefault();

  const dados = Storage.buscar();
  verNome.innerText = "Dados do local storage: " + dados;
}
