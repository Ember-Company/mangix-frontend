import AuthHandler from "./components/auth/index.js";
import Sidebar from "./components/sidebar.js";
import Events from "./utils/Events.js";

// new AuthHandler();

function init() {
  // initilize all components
  new Sidebar();
}

Events.$onPageLoad(() => {
  console.log("app started");
  init();
});
