import { init } from "../_base.js";

export function toPage(path) {
  return `${import.meta.env.VITE_APP_PAGES_PREFIX}/${path}`;
}

export async function loadPage(path) {
  try {
    const response = await fetch(path);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const html = await response.text();
    const parser = new DOMParser();
    const newDoc = parser.parseFromString(html, "text/html");
    const newBody = newDoc.querySelector("body");

    document.querySelector("body").innerHTML = newBody.innerHTML;
    init();
  } catch (error) {
    console.error(error);
  }
}
