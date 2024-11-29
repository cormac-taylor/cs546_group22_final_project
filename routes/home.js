import { Router } from "express";
const router = Router();

router.route("/").get(async (_, res) => {
  try {
    res.render("home", { pageTitle: "BokenBoards" });
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

export default router;
