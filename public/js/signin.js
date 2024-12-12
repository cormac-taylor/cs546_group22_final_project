import { validateUsername, validatePassword } from "./client_validation.js";

let signInForm = document.getElementById("signin-form");
let usernameInput = document.getElementById("username");
let passwordInput = document.getElementById("password");
let errorList = document.getElementById("client-error-list");

if (signInForm) {
  signInForm.addEventListener("submit", (event) => {
    let hasErrors = false;
    const user = usernameInput.value;
    const pass = passwordInput.value;

    try {
      usernameInput.value = validateUsername(user);
      passwordInput.value = validatePassword(pass);
    } catch (e) {
      hasErrors = true;
      usernameInput.value = user.trim();
      passwordInput.value = "";
    }

    if (hasErrors) {
      event.preventDefault();

      errorList.innerHTML = "";
      let li = document.createElement("li");
      li.innerHTML = "Invalid username or password. Please try again.";
      errorList.appendChild(li);
      errorList.hidden = false;
    } else {
      errorList.hidden = true;
      errorList.innerHTML = "";
    }
  });
}
