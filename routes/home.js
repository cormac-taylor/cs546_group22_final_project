import { Router } from "express";
const router = Router();
import xss from "xss";
import {} from "../utilities/validation.js";

router.route("/").get(async (req, res) => {
  try {
    res.render("home", { pageTitle: "BokenBoards" });
    // if (req.session.user){
    //   res.redirect(`/dashboard`)
    // }
    // else{
    //   res.render("home", { pageTitle: "BokenBoards" })
    // }
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

export default router;
