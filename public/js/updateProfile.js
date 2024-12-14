import {
  validateUsername,
  validatePassword,
  validateName,
  validateEmail,
} from "./client_validation.js";

let attribute = document.getElementById("attribute");
let updateForm = document.getElementById("profile-update-form");
let valueInput = document.getElementById("newValue");
let newPasswordInput = document.getElementById("newPassword");
let confirmNewPasswordInput = document.getElementById("confirmNewPassword");
let clientErrorList = document.getElementById("client-error-list");
let serverErrorList = document.getElementById("server-list");

if (updateForm) {
    attribute.addEventListener("change", (event) => {

  if (attribute.value === "username") {
    valueInput.addEventListener("input", (event) => {
      const errors = [];
      const username = valueInput.value;

      try {
        valueInput.value = validateUsername(username);
      } catch (e) {
        valueInput.value = username.trim();
        errors.push(`Username ${e}`);
      }

      clientErrorList.innerHTML = "";
      if (errors.length > 0) {
        for (let e of errors) {
          let li = document.createElement("li");
          li.innerHTML = e;
          clientErrorList.appendChild(li);
        }
        clientErrorList.hidden = false;
        if (serverErrorList) serverErrorList.hidden = true;
        return;
      }

      let requestConfig = {
        url: "/signup/unique/username",
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
          }
          $("#client-error-list").show();
          $("#server-error-list").hide();
        });
      })(jQuery);

      return;
    });
  }

//   emailInput.addEventListener("input", (event) => {
//     const email = emailInput.value;

//     try {
//       emailInput.value = validateEmail(email);
//     } catch (e) {
//       return;
//     }

//     clientErrorList.innerHTML = "";

//     let requestConfig = {
//       url: "/signup/unique/email",
//       method: "POST",
//       data: { email: email },
//     };

//     (function ($) {
//       $.ajax(requestConfig).then(function (responseMessage) {
//         const ajaxErrors = [];
//         if (responseMessage && responseMessage.isUniqueEmail !== undefined) {
//           if (!responseMessage.isUniqueEmail) {
//             ajaxErrors.push("Email already taken.");
//           }
//         } else {
//           ajaxErrors.push("Could not check email availability.");
//         }

//         if (ajaxErrors.length > 0) {
//           for (let e of ajaxErrors) {
//             let li = $("<li></li>").text(e);
//             $("#client-error-list").append(li);
//           }
//         }
//         $("#client-error-list").show();
//         $("#server-error-list").hide();
//       });
//     })(jQuery);

//     return;
//   });

//   signUpForm.addEventListener("submit", (event) => {
//     const errors = [];
//     const firstName = firstNameInput.value;
//     const lastName = lastNameInput.value;
//     const username = usernameInput.value;
//     const email = emailInput.value;
//     const password = passwordInput.value;
//     const confirmPassword = confirmPasswordInput.value;

//     try {
//       firstNameInput.value = validateName(firstName);
//     } catch (e) {
//       firstNameInput.value = firstName.trim();
//       errors.push(`First Name ${e}`);
//     }

//     try {
//       lastNameInput.value = validateName(lastName);
//     } catch (e) {
//       lastNameInput.value = lastName.trim();
//       errors.push(`Last Name ${e}`);
//     }

//     try {
//       usernameInput.value = validateUsername(username);
//     } catch (e) {
//       usernameInput.value = username.trim();
//       errors.push(`Username ${e}`);
//     }

//     try {
//       emailInput.value = validateEmail(email);
//     } catch (e) {
//       emailInput.value = email.trim();
//       errors.push(`Email ${e}`);
//     }

//     let invalidPassword = false;
//     try {
//       passwordInput.value = validatePassword(password);
//     } catch (e) {
//       passwordInput.value = password.trim();
//       invalidPassword = true;
//       errors.push(`Password ${e}`);
//     }

//     if (!invalidPassword) {
//       try {
//         confirmPasswordInput.value = validatePassword(confirmPassword);
//         if (passwordInput.value !== confirmPasswordInput.value)
//           throw "Confirm Password doesn't match.";
//       } catch (e) {
//         confirmPasswordInput.value = confirmPassword.trim();
//         errors.push("Confirm Password doesn't match.");
//       }
//     }

//     if (errors.length > 0) {
//       event.preventDefault();

//       clientErrorList.innerHTML = "";
//       for (let e of errors) {
//         let li = document.createElement("li");
//         li.innerHTML = e;
//         clientErrorList.appendChild(li);
//       }
//       clientErrorList.hidden = false;
//       if (serverErrorList) serverErrorList.hidden = true;
//     } else {
//       clientErrorList.innerHTML = "";
//       clientErrorList.hidden = true;
//       if (serverErrorList) serverErrorList.hidden = false;
//     }
//   });
    });
}
