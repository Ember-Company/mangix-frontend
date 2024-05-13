import { PageLoader } from "./loading";

const errorContainer = document.querySelector(".error");

const notAuthorizedHtml = `<div class="container-xxl container-p-y">
      <div class="misc-wrapper">
        <h2 class="mb-2 mx-2">You are not authorized!</h2>
        <p class="mb-4 mx-2">
          You do not have permission to view this page using the credentials
          that you have provided while login. <br />
          Please contact your site administrator.
        </p>
        <a href="/app/auth/login-adm/" class="btn btn-primary">Back to Login</a>
        <div class="mt-5">
          <img
            src="/src/assets/img/illustrations/girl-with-laptop-light.png"
            alt="page-misc-not-authorized-light"
            width="450"
            class="img-fluid"
            data-app-light-img="illustrations/girl-with-laptop-light.png"
            data-app-dark-img="illustrations/girl-with-laptop-dark.html"
          />
        </div>
      </div>
    </div> 
  `;

export default class ErrorPage {
  static notAuthorized() {
    PageLoader.hide();
    errorContainer.classList.remove("hide");
    errorContainer.innerHTML = notAuthorizedHtml;
  }
}
