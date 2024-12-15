import {
  validateEmail,
  validateName,
  validatePassword,
  validateUsername,
} from "./client_validation.js";

let attribute = document.getElementById("attribute");
let updateForm = document.getElementById("profile-update-form");
let newValueInput = document.getElementById("newValue");
let newPasswordInput = document.getElementById("newPassword");
let confirmNewPasswordInput = document.getElementById("confirmNewPassword");
let clientErrorList = document.getElementById("client-error-list");
let serverErrorList = document.getElementById("server-list");

if (updateForm) {
  attribute.addEventListener("change", (event) => {
    clientErrorList.innerHTML = "";
    clientErrorList.hidden = true;
    if (serverErrorList) {
      serverErrorList.innerHTML = "";
      serverErrorList.hidden = true;
    }
    if (attribute.value === "firstName" || attribute.value === "lastName") {
      updateForm.addEventListener("submit", (event) => {
        const errors = [];
        const name = newValueInput.value;

        try {
          newValueInput.value = validateName(name);
        } catch (e) {
          newValueInput.value = name.trim();
          const nameLabel =
            attribute.value === "firstName" ? "First name" : "Last name";
          errors.push(`${nameLabel} ${e}`);
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
    } else if (attribute.value === "username") {
      newValueInput.addEventListener("input", (event) => {
        const username = newValueInput.value;

        try {
          newValueInput.value = validateUsername(username);
        } catch (e) {
          return;
        }

        let requestConfig = {
          url: "/api/unique/username",
          method: "POST",
          data: { username: username },
        };

        (function ($) {
          $.ajax(requestConfig).then(function (responseMessage) {
            const ajaxErrors = [];
            if (
              responseMessage &&
              responseMessage.isUniqueUsername !== undefined
            ) {
              if (!responseMessage.isUniqueUsername) {
                ajaxErrors.push("Username already taken.");
              }
            } else {
              ajaxErrors.push("Could not check username availability.");
            }

            if (ajaxErrors.length > 0) {
              for (let e of ajaxErrors) {
                let li = $("<li></li>").text(e);
                $("#client-error-list").append(li);
              }
              $("#client-error-list").show();
            } else {
              $("#client-error-list").hide();
            }
            $("#server-list").hide();
          });
        })(jQuery);

        clientErrorList.innerHTML = "";
        clientErrorList.hidden = true;
        if (serverErrorList) serverErrorList.hidden = false;
      });

      updateForm.addEventListener("submit", (event) => {
        const errors = [];
        const username = newValueInput.value;

        try {
          newValueInput.value = validateUsername(username);
        } catch (e) {
          newValueInput.value = username.trim();
          errors.push(`Username ${e}`);
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
          return;
        }

        clientErrorList.innerHTML = "";
        clientErrorList.hidden = true;
        if (serverErrorList) serverErrorList.hidden = false;
      });
    } else if (attribute.value === "email") {
      newValueInput.addEventListener("input", (event) => {
        // const errors = [];
        const email = newValueInput.value;

        try {
          newValueInput.value = validateEmail(email);
        } catch (e) {
          //   newValueInput.value = username.trim();
          //   errors.push(`Username ${e}`);
          return;
        }

        // if (errors.length > 0) {
        //   event.preventDefault();

        //   clientErrorList.innerHTML = "";
        //   for (let e of errors) {
        //     let li = document.createElement("li");
        //     li.innerHTML = e;
        //     clientErrorList.appendChild(li);
        //   }
        //   clientErrorList.hidden = false;
        //   if (serverErrorList) serverErrorList.hidden = true;
        //   return;
        // }

        let requestConfig = {
          url: "/api/unique/email",
          method: "POST",
          data: { email: email },
        };

        (function ($) {
          $.ajax(requestConfig).then(function (responseMessage) {
            const ajaxErrors = [];
            if (
              responseMessage &&
              responseMessage.isUniqueEmail !== undefined
            ) {
              if (!responseMessage.isUniqueEmail) {
                ajaxErrors.push("Email already taken.");
              }
            } else {
              ajaxErrors.push("Could not check email availability.");
            }

            if (ajaxErrors.length > 0) {
              for (let e of ajaxErrors) {
                let li = $("<li></li>").text(e);
                $("#client-error-list").append(li);
              }
              $("#client-error-list").show();
            } else {
              $("#client-error-list").hide();
            }
            $("#server-list").hide();
          });
        })(jQuery);

        clientErrorList.innerHTML = "";
        clientErrorList.hidden = true;
        if (serverErrorList) serverErrorList.hidden = false;
      });

      updateForm.addEventListener("submit", (event) => {
        const errors = [];
        const email = newValueInput.value;

        try {
          newValueInput.value = validateEmail(email);
        } catch (e) {
          newValueInput.value = email.trim();
          errors.push(`Email ${e}`);
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
          return;
        }

        clientErrorList.innerHTML = "";
        clientErrorList.hidden = true;
        if (serverErrorList) serverErrorList.hidden = false;
      });
    } else if (attribute.value === "password") {
      updateForm.addEventListener("submit", (event) => {
        const errors = [];
        let invalidPassword = false;
        const password = newPasswordInput.value;
        const confirmPassword = confirmNewPasswordInput.value;

        try {
          newPasswordInput.value = validatePassword(password);
        } catch (e) {
          newPasswordInput.value = password.trim();
          invalidPassword = true;
          errors.push(`Password ${e}`);
        }

        if (!invalidPassword) {
          try {
            confirmNewPasswordInput.value = validatePassword(confirmPassword);
            if (confirmNewPasswordInput.value !== newPasswordInput.value)
              throw "Confirm Password doesn't match.";
          } catch (e) {
            confirmNewPasswordInput.value = confirmPassword.trim();
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
  });
}
