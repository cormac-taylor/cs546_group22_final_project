import {Router} from 'express';
import {usersData} from '../data/index.js';
import * as validation from "../utilities/validation.js"
import xss from "xss"
const router = Router();

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
  