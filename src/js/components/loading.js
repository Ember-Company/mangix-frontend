export class PageLoader {
  static disable() {
    const loader = document.querySelector(".loading");
    if (!loader) return;

    loader.classList.add("hide");
  }

  static enable() {
    try {
      document.querySelector(".content-body").classList.add("hide");
      document.querySelector(".error").classList.add("hide");
      document.querySelector(".loading").classList.remove("hide");
    } catch (error) {
      console.error("Custom error: This page does not have a loader to enable");
      return;
    }
  }
}
