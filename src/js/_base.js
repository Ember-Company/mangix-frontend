import Sidebar from "./components/sidebar.js";

export function init() {
  // initilize all components
  new Sidebar();
}

window.addEventListener("DOMContentLoaded", init);

