import { validateName, validatePassword } from "./client_validation.js";

let attribute = document.getElementById("attribute");
let updateForm = document.getElementById("profile-update-form");
let newValueInput = document.getElementById("newValue");
let newPasswordInput = document.getElementById("newPassword");
let confirmNewPasswordInput = document.getElementById("confirmNewPassword");
let clientErrorList = document.getElementById("client-error-list");
let serverErrorList = document.getElementById("server-list");

if (updateForm) {
  attribute.addEventListener("change", (event) => {
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
