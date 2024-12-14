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
    return res.status(500).render("error", {signedIn: true, pageTitle: "Error", errorStatus: "500", errorMsg: "500 Server Error"});
  }
});

export default router;
