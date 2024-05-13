export class PageLoader {
  static disable() {
    document.querySelector(".loading").classList.add("hide");
  }

  static enable() {
    document.querySelector(".loading").classList.remove("hide");
  }
}
