import { Router } from "express";
const router = Router();
import * as validation from "../utilities/validation.js";
import * as gamesapi from "../data/gamesAPI.js"
import * as games from "../data/games.js"
import * as userData from "../data/users.js"
import * as gameReviewData from "../data/gameReviews.js"

router.route("/").get(async (req, res) => {
    if(!req.session.user){
        return res.render("signin", { pageTitle: "Sign In", status: "Please Sign In Before Managing Games!"})
    }

    let user;
    try {
        user = await userData.getUserById(req.session.user.userId);
    } catch (e) {
        return res.status(500).render("error", {pageTitle: "Error", status: "500", errorMsg: e});
    }
    try {
        let g;
        g = await games.sortByClosestLocation(user.location.geometry, req.session.user.userId);
        if(req.session.user){
            if(g.length === 0) {
                res.render("gamesHome", {signedIn: true, pageTitle: "Discover", games: g, user: req.session.user.username, gamesFound: false});
            }
            else{
                res.render("gamesHome", {signedIn: true, pageTitle: "Discover", games: g, user: req.session.user.username, gamesFound: true});
            }
        }
        else{
            res.render("signin", { pageTitle: "BokenBoards", status: "Sign in to see more!" })
        }
    } catch (e) {
        return res.status(500).render("error", {pageTitle: "Error", status: "500", errorMsg: e});
    }
});
router.route("/").post(async (req, res) => {
    if(!req.session.user){
        res.render("signin", { pageTitle: "BokenBoards" });
        return;
    }
    let user;
    try {
        user = await userData.getUserById(req.session.user.userId);
    } catch (e) {
        return res.status(500).render("error", {pageTitle: "Error", status: "500", errorMsg: e});
    }
    try {
        let g;
        if(!req.body.sortBy || (req.body.sortBy !== "closest" && req.body.sortBy !== "rating")) {throw 'Please select a Sorting Metric'}

        if(req.body.sortBy === "closest"){
            g = await games.sortByClosestLocation(user.location.geometry, req.session.user.userId);
        }
        if(req.body.sortBy === "rating") {
            g = await games.sortByRating(user.location.geometry, req.session.user.userId);
        }
        if(req.body.searchTerm) {
            g = g.filter((game) => game.gameTitle === req.body.searchTerm);
        }
        if(req.session.user){
            if(g.length === 0) {
                res.render("gamesHome", {signedIn: true, pageTitle: "Discover", games: g, user: req.session.user.username, gamesFound: false});
            }
            else{
                res.render("gamesHome", {signedIn: true, pageTitle: "Discover", games: g, user: req.session.user.username, gamesFound: true});
            }
        }
        else{
            res.render("signin", { pageTitle: "BokenBoards", status: "Sign in to see more!" })
        }
    } catch (e) {
        return res.status(500).render("error", {pageTitle: "Error", status: "500", errorMsg: e});
    }
});
router.route("/gameDetails").post(async (req, res) => {
    if(req.session.user){
        let game;
        let reviewList ;
        try {
            game = await games.getGameById(req.body.gid);
        } catch (e) {
            return res.status(500).render("error", {pageTitle: "Error", status: "500", errorMsg: e});
        }
        try {
            reviewList = await gameReviewData.getGameReviewsByReviewedGameId(req.body.gid);
        } catch (e) {
            return res.status(500).render("error", {pageTitle: "Error", status: "500", errorMsg: e});
        }
        try {
            let postUser = await userData.getUserById(game.ownerID.toString());
            res.render("gameDetails", {signedIn: true, pageTitle: "Game Details", g: game, user: postUser.username, reviews: reviewList});
        } catch (e) {
            return res.status(500).render("error", {pageTitle: "Error", status: "500", errorMsg: e});
        }
    }
    else {
        res.render("signin", { pageTitle: "Boken Boards", status: "Sign in to see more!"})
    }
});

export default router;