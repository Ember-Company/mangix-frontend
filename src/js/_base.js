import Sidebar from "./components/sidebar.js";
import Events from "./utils/Events.js";

function init() {
  new Sidebar();
}

Events.$onPageLoad(() => {
  init();
});
