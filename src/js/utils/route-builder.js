import app_config from "../config/env.js";

// export function toPage(path) {
//   return `${app_config.APP_PAGES_PREFIX}/${path}`;
// }

export function toPage(path) {
  return `${import.meta.env.VITE_APP_PAGES_PREFIX}/${path}`;
}
