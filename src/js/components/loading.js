export class PageLoader {
  static disable() {
    
    const loader=document.querySelector(".loading")
    if (loader) return

    loader.classList.add("hide");
  }

  static enable() {
    document.querySelector(".loading").classList.remove("hide");
  }
}
