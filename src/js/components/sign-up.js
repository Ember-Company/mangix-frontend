import CreateAccount from "../services/create-account.js";

const emailInput = document.getElementById("emailSubmit");
const passwordInput = document.getElementById("passwordSubmit");
const formSubmit = document.getElementById("signUpBtn");

formSubmit.addEventListener("click", async (event) => {
  event.preventDefault();

  const { data: result, error } = await CreateAccount(
    emailInput.value,
    passwordInput.value
  );

  if (error) {
    console.error(error.message);
  }

  if (result) {
    console.log(result);
  }
});
