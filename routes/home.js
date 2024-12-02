import { Router } from "express";
const router = Router();
import {} from "../utilities/validation.js";

router.route("/").get(async (req, res) => {
  try {
    if(req.session.user) {
      res.render("home", { pageTitle: "BokenBoards", user: req.session.user.username });
    }
    else {
      res.render("home", { pageTitle: "BokenBoards"});
    }
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

export default router;
