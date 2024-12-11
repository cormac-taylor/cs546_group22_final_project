import {
  validateUsername,
  validatePassword,
  validateName,
  validateEmail,
} from "./client_validation.js";

let signUpForm = document.getElementById("signup-form");
let firstNameInput = document.getElementById("firstName");
let lastNameInput = document.getElementById("lastName");
let usernameInput = document.getElementById("username");
let emailInput = document.getElementById("email");
let passwordInput = document.getElementById("password");
let confirmPasswordInput = document.getElementById("confirmPassword");
let clientErrorList = document.getElementById("client-error-list");
let serverErrorList = document.getElementById("server-error-list");

if (signUpForm) {
  signUpForm.addEventListener("submit", (event) => {
    const errors = [];
    const firstName = firstNameInput.value;
    const lastName = lastNameInput.value;
    const username = usernameInput.value;
    const email = emailInput.value;
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;

    try {
      firstNameInput.value = validateName(firstName);
    } catch (e) {
      firstNameInput.value = firstName.trim();
      errors.push(`First Name ${e}`);
    }

    try {
      lastNameInput.value = validateName(lastName);
    } catch (e) {
      lastNameInput.value = lastName.trim();
      errors.push(`Last Name ${e}`);
    }

    try {
      usernameInput.value = validateUsername(username);
    } catch (e) {
      usernameInput.value = username.trim();
      errors.push(`Username ${e}`);
    }

    try {
      emailInput.value = validateEmail(email);
    } catch (e) {
      emailInput.value = email.trim();
      errors.push(`Email ${e}`);
    }

    let invalidPassword = false;
    try {
      passwordInput.value = validatePassword(password);
    } catch (e) {
      passwordInput.value = password.trim();
      invalidPassword = true;
      errors.push(`Password ${e}`);
    }

    if (!invalidPassword) {
      try {
        confirmPasswordInput.value = validatePassword(confirmPassword);
      } catch (e) {
        confirmPasswordInput.value = confirmPassword.trim();
        errors.push(`Confirm Password doesn't match.`);
      }
    }

    if (errors.length > 0) {
      event.preventDefault();

      clientErrorList.innerHTML = "";
      for (let e of errors) {
        let li = document.createElement("li");
        li.innerHTML = e;
        clientErrorList.appendChild(li);
      }
      clientErrorList.hidden = false;
      serverErrorList.hidden = true;
    } else {
        clientErrorList.innerHTML = "";
        clientErrorList.hidden = true;
        serverErrorList.hidden = false;
    }
  });
}
