import { Router } from "express";
import { usersData, locationData } from "../data/index.js";
import { utils } from "../utilities/utilityIndex.js";
import * as validation from "../utilities/validation.js";
import xss from "xss";
const router = Router();

//  If user is signed in, app.js routes to the main logged in page
router
  .route("/")
  .get(async (req, res) => {
    try {
      res.render("signup", {
        pageTitle: "Sign Up",
      });
    } catch (e) {
      return res.status(500).render("error", {signedIn: true, pageTitle: "Error", errorStatus: "500", errorMsg: "500 Server Error"});
    }
  })
  .post(async (req, res) => {
    /* User signup verification */
    const userSignupData = req.body;
    let errors = [];
    let plainTextPass;
    try {
      userSignupData.firstName = validation.validateName(
        xss(userSignupData.firstName)
      );
    } catch (e) {
      errors.push(`First name ${e}`);
    }
    try {
      userSignupData.lastName = validation.validateName(
        xss(userSignupData.lastName)
      );
    } catch (e) {
      errors.push(`Last name ${e}`);
    }
    try {
      userSignupData.username = validation.validateUsername(
        xss(userSignupData.username)
      );
    } catch (e) {
      errors.push(`Username ${e}`);
    }
    try {
      userSignupData.email = validation.validateEmail(
        xss(userSignupData.email)
      );
    } catch (e) {
      errors.push(`Email ${e}`);
    }
    try {
      userSignupData.password = validation.validatePassword(xss(userSignupData.password))
    } catch (e) {
      errors.push(`Password ${e}`);
    }
    /* Error Display*/
    if (errors.length > 0) {
      res.render("signup", {
        pageTitle: "Sign Up",
        errors: errors,
        hasErrors: true,
        signup: userSignupData,
      });
      return;
    }

    try {
      let location = locationData.defaultLocation();
      const { firstName, lastName, username, email, password } = userSignupData;

      let hashedPassword = await utils.hashPassword(password);
      const newUser = await usersData.createUser(
        firstName,
        lastName,
        username,
        email,
        hashedPassword,
        location
      );
      //TODO: Redirect to login page with notification of successful user account creation
      res.redirect(`/signin`);
    } catch (e) {
      res.status(500).render("signup", {
        pageTitle: "Sign Up",
        errors: [e],
        hasErrors: true,
        signup: userSignupData,
      });
      return;
    }
  });

router.route("/unique/username").post(async (req, res) => {
  try {
    const username = validation.validateUsername(xss(req.body.username));
    res.json({ isUniqueUsername: await usersData.isUniqueUsername(username) });
  } catch (e) {
    return res.status(500).render("error", {signedIn: true, pageTitle: "Error", errorStatus: "500", errorMsg: "500 Server Error"});
  }
});

router.route("/unique/email").post(async (req, res) => {
  try {
    const email = validation.validateEmail(xss(req.body.email));
    res.json({ isUniqueEmail: await usersData.isUniqueEmail(email) });
  } catch (e) {
    return res.status(500).render("error", {signedIn: true, pageTitle: "Error", errorStatus: "500", errorMsg: "500 Server Error"});
  }
});

export default router;
