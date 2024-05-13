export class PageLoader {
  static hide() {
    document.querySelector(".loading").classList.add("hide");
  }

  static show() {
    document.querySelector(".loading").classList.remove("hide");
  }
}
