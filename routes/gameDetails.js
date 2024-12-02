import { Router } from "express";
const router = Router();
import * as validation from "../utilities/validation.js";
import * as gamesapi from "../data/gamesAPI.js"
import * as games from "../data/games.js"
import * as userData from "../data/users.js"
import * as gameReviewData from "../data/gameReviews.js"

router.route("/").get(async (_, res) => {
    let g = await games.getAllGames();
    res.render("gamesHome", {games: g});
});
router.route("/gameDetails").post(async (req, res) => {
    let game;
    let reviewList ;
    try {
        game = await games.getGameById(req.body.gid);
    } catch (e) {
        res.status(500).json({ error: e });
    }
    try {
        reviewList = await gameReviewData.getGameReviewsByReviewedGameId(req.body.gid);
    } catch (e) {
        res.status(500).json({ error: e });
    }
    try {
        let postUser = await userData.getUserById(game.ownerID.toString());
        res.render("gameDetails", {g: game, user: postUser.username, reviews: reviewList});
    } catch (e) {
        res.status(500).json({ error: e });
    }
});

export default router;