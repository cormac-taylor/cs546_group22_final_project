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
  usernameInput.addEventListener("input", (event) => {
    const errors = [];
    const username = usernameInput.value;

    try {
      usernameInput.value = validateUsername(username);
    } catch (e) {
      usernameInput.value = username.trim();
      errors.push(`Username ${e}`);
    }

    if (errors.length == 0) {
      let requestConfig = {
        url: "/signin/uniqueUsername",
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify({ username: username }),
      };

      $.ajax(requestConfig).then(function (responseMessage) {
        if (responseMessage && responseMessage.isUniqueUsername !== undefined) {
          if (!responseMessage.isUniqueUsername) {
            // notify user with error
          } else {
            // things are good
          }
        } else {
          // req error
        }
      });
    } else {
      clientErrorList.innerHTML = "";
      for (let e of errors) {
        let li = document.createElement("li");
        li.innerHTML = e;
        clientErrorList.appendChild(li);
      }
      clientErrorList.hidden = false;
      serverErrorList.hidden = true;
    }
  });

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

(function ($) {
  let myNewTaskForm = $("#new-item-form"),
    newNameInput = $("#new-task-name"),
    newDecriptionArea = $("#new-task-description"),
    todoArea = $("#todo-area");

  //When the page loads, we want to query the server to get the TODO data as raw JSON
  //Set up request config
  let requestConfig = {
    method: "GET",
    url: "/api/todo/json",
  };
  //Make AJAX Call
  $.ajax(requestConfig).then(function (responseMessage) {
    //Now we are going to loop through the data, creating each element group for each todo in the data
    //Pay attention, when I'm building the html elements, I check the notDone field and display a different
    //element depending on if the todo is done or not
    console.log(responseMessage);
    responseMessage.map((todoItem) => {
      let element = $(
        `<div class="row" class="todo-item"><div class="col-sm-12 col-md-8"><h3>${
          todoItem.title
        }</h3><p>${todoItem.task}</p>${
          todoItem.notDone
            ? `<a class="finishItem" data-id="${todoItem.id}">Finish</a></div></div>`
            : "<em>This task has been completed</em></div></div>"
        }`
      );
      if (todoItem.notDone) {
        //bind the todo link for the click event
        bindEventsToTodoItem(element);
      }
      //append the todo to the page
      todoArea.append(element);
    });
  });
  /*
    This function takes in an element and binds the click event to the link to mark the todo complete.
    The link element is created above when parsing through the JSON data
   */
  function bindEventsToTodoItem(todoItem) {
    todoItem.find(".finishItem").on("click", function (event) {
      //mark the todo complete when clicked
      event.preventDefault();
      let currentLink = $(this);
      let currentId = currentLink.data("id");

      let requestConfig = {
        method: "POST",
        url: "/api/todo/complete/json/" + currentId,
      };

      $.ajax(requestConfig).then(function (responseMessage) {
        console.log(responseMessage);
        let data = responseMessage;
        let element = $(
          `<div class="row" class="todo-item"><div class="col-sm-12 col-md-8"><h3>${data.title}</h3><p>${data.task}</p><em>This task has been completed</em></div></div>`
        );

        //bindEventsToTodoItem(element);
        todoItem.replaceWith(element);
      });
    });
  }

  //new todo form submission event
  myNewTaskForm.submit(function (event) {
    event.preventDefault();

    let newName = newNameInput.val();
    let newDescription = newDecriptionArea.val();

    if (newName && newDescription) {
      //set up AJAX request config
      let requestConfig = {
        method: "POST",
        url: "/api/todo/json",
        contentType: "application/json",
        data: JSON.stringify({
          name: newName,
          description: newDescription,
        }),
      };
      //AJAX Call. Gets the returned JSON data, creates the elements, binds the click event to the link and appends the new todo to the page
      $.ajax(requestConfig).then(function (responseMessage) {
        console.log(responseMessage);

        let element = $(
          `<div class="row" class="todo-item"><div class="col-sm-12 col-md-8"><h3>${responseMessage.todo.title}</h3><p>${responseMessage.todo.task}</p><a class="finishItem" data-id="${responseMessage.todo.id}">Finish</a></div></div>`
        );
        bindEventsToTodoItem(element);
        todoArea.append(element);
        newNameInput.val("");
        newDecriptionArea.val("");
        newNameInput.focus();
      });
    }
  });
})(window.jQuery);
