import {
  validateUsername,
  validatePassword,
  validateName,
  validateEmail,
  validateLocation,
} from "./client_validation.js";

let signUpForm = document.getElementById("signup-form");
let firstNameInput = document.getElementById("firstName");
let lastNameInput = document.getElementById("lastName");
let emailInput = document.getElementById("email");
let locationInput = document.getElementById("location");
let usernameInput = document.getElementById("username");
let passwordInput = document.getElementById("password");
let confirmPasswordInput = document.getElementById("confirmPassword");
let clientErrorList = document.getElementById("client-error-list");
let serverErrorList = document.getElementById("server-error-list");
let signupButton = document.getElementById("signupButton");

if (signUpForm) {
  usernameInput.addEventListener("input", (event) => {
    signupButton.disabled = false;
    const username = usernameInput.value;

    try {
      usernameInput.value = validateUsername(username);
    } catch (e) {
      return;
    }

    clientErrorList.innerHTML = "";

    let requestConfig = {
      url: "/api/unique/username",
      method: "POST",
      data: { username: username },
    };

    (function ($) {
      $.ajax(requestConfig).then(function (responseMessage) {
        const ajaxErrors = [];
        if (responseMessage && responseMessage.isUniqueUsername !== undefined) {
          if (!responseMessage.isUniqueUsername) {
            ajaxErrors.push("Username already taken.");
          }
        } else {
          ajaxErrors.push("Could not check username availability.");
        }

        if (ajaxErrors.length > 0) {
          $("#signupButton").prop("disabled", true);
          for (let e of ajaxErrors) {
            let li = $("<li></li>").text(e);
            $("#client-error-list").append(li);
          }
        }
      });
    })(jQuery);
    clientErrorList.hidden = false;
    if (serverErrorList) serverErrorList.hidden = true;

    return;
  });

  emailInput.addEventListener("input", (event) => {
    signupButton.disabled = false;
    const email = emailInput.value;

    try {
      emailInput.value = validateEmail(email);
    } catch (e) {
      return;
    }

    clientErrorList.innerHTML = "";

    let requestConfig = {
      url: "/api/unique/email",
      method: "POST",
      data: { email: email },
    };

    (function ($) {
      $.ajax(requestConfig).then(function (responseMessage) {
        const ajaxErrors = [];
        if (responseMessage && responseMessage.isUniqueEmail !== undefined) {
          if (!responseMessage.isUniqueEmail) {
            ajaxErrors.push("Email already taken.");
          }
        } else {
          ajaxErrors.push("Could not check email availability.");
        }

        if (ajaxErrors.length > 0) {
          $("#signupButton").prop("disabled", true);
          for (let e of ajaxErrors) {
            let li = $("<li></li>").text(e);
            $("#client-error-list").append(li);
          }
        }
      });
    })(jQuery);
    clientErrorList.hidden = false;
    if (serverErrorList) serverErrorList.hidden = true;

    return;
  });

  signUpForm.addEventListener("submit", (event) => {
    const errors = [];
    const firstName = firstNameInput.value;
    const lastName = lastNameInput.value;
    const email = emailInput.value;
    const location = locationInput.value;
    const username = usernameInput.value;
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
      emailInput.value = validateEmail(email);
    } catch (e) {
      emailInput.value = email.trim();
      errors.push(`Email ${e}`);
    }

    try {
      locationInput.value = validateLocation(location);
    } catch (e) {
      locationInput.value = location.trim();
      errors.push(`Location ${e}`);
    }

    try {
      usernameInput.value = validateUsername(username);
    } catch (e) {
      usernameInput.value = username.trim();
      errors.push(`Username ${e}`);
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
        if (passwordInput.value !== confirmPasswordInput.value)
          throw "Confirm Password doesn't match.";
      } catch (e) {
        confirmPasswordInput.value = confirmPassword.trim();
        errors.push("Confirm Password doesn't match.");
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
      if (serverErrorList) serverErrorList.hidden = true;
    } else {
      clientErrorList.innerHTML = "";
      clientErrorList.hidden = true;
      if (serverErrorList) serverErrorList.hidden = false;
    }
  });
}
