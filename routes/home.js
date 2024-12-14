import { Router } from "express";
const router = Router();
import {} from "../utilities/validation.js";
import { getAllGames } from "../data/games.js";

router.route("/").get(async (req, res) => {
  try {
    const gameThumbnails = [];
    for (let i = 0; i < 5; i++) {
      gameThumbnails.push({
        src: "/public/images/bokenBoardsPoster.png",
        alt: "BokenBoards Poster",
      });
    }

    let i = 0,
      imgs = [];
    const games = await getAllGames();
    while (imgs.length < 5) {
      let g = games[Math.floor(Math.random() * games.length)]
      if (!imgs.includes(g.imgURL)) {
        imgs.push(g.imgURL);
        gameThumbnails[i].src = g.imgURL;
        gameThumbnails[i].alt = `${g.gameTitle} Poster`;
        i++;
      }
      if (imgs.length >= 5) break;
    }

    let signedIn = req.session.user ? true : false;
    res.render("home", {
      pageTitle: "BokenBoards",
      signedIn: signedIn,
      games: gameThumbnails,
    });
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

export default router;
