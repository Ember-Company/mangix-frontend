export class Storage {
  static salvar(dados) {
    localStorage.setItem("nome", JSON.stringify(dados));
  }

  static buscar() {
    return JSON.parse(localStorage.getItem("nome"));
  }
}
