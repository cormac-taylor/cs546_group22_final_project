import { Router } from "express";
const router = Router();
import xss from "xss";
import {} from "../utilities/validation.js";

router.route("/").get(async (req, res) => {
  try {
    let signedIn = req.session.user ? true : false;
    res.render("home", { pageTitle: "BokenBoards", signedIn: signedIn });
    // if (req.session.user){
    //   res.redirect(`/dashboard`)
    // }
    // else{
    //     let signedIn = req.session.user ? true : false;
    //   res.render("home", { pageTitle: "BokenBoards", signedIn })
    // }
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

export default router;
