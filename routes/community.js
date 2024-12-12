import { Router } from "express";
const router = Router();
import * as validation from "../utilities/validation.js";
import * as gamesapi from "../data/gamesAPI.js"
import * as games from "../data/games.js"
import * as gameReviews from "../data/gameReviews.js"
import * as userReviews from "../data/userReviews.js"
import * as users from "../data/users.js"
import xss from "xss"

router.route("/").get(async (req, res) => {
    return res.render("communityHome");
});

router.route("/:userId").get(async (req, res) => {
    let reviewList;
    let user;

    try{
        validation.validateObjectID(xss(req.params.userId));
    } catch (e) {
        return res.send(500).render("error", {pageTitle: "Error", status: "500", errorMsg: "Invalid UserId"});
    }
    try{
        user = await users.getUserById(xss(req.params.userId));
    } catch (e) {
        return res.send(404).render("error", {pageTitle: "Error", status: "404", errorMsg: "User not found"});
    }
    try{
        reviewList = await userReviews.getUserReviewsByReviewedUserId(xss(req.params.userId))
        res.render("viewUserReviews", {pageTitle: "User Reviews", name: user.username, avgRating: user.averageRating, uid: user._id, reviews: reviewList});
    } catch (e) {
        return res.send(404).render("error", {pageTitle: "Error", status: "404", errorMsg: "User not found"});
    }
});

router.route("/writeUserReview/:userId").get(async (req, res) => {
    let user;

    try{
        validation.validateObjectID(xss(req.params.userId));
    } catch (e) {
        return res.send(500).render("error", {pageTitle: "Error", status: "500", errorMsg: "Invalid UserId"});
    }
    try{
        user = await users.getUserById(xss(req.params.userId));
        res.render("writeReview", {pageTitle: "Write a Review", reviewed: user.username, uid: xss(req.params.userId)});
    } catch (e) {
        return res.send(404).render("error", {pageTitle: "Error", status: "404", errorMsg: "User not found"});
    }

});

router.route("/writeUserReview/:userId").post(async (req, res) => {
    let user;
    let review;
    let reviewList;

    try{
        validation.validateObjectID(xss(req.params.userId));
    } catch (e) {
        return res.send(500).render("error", {pageTitle: "Error", status: "500", errorMsg: "Invalid UserId"});
    }
    try{
        user = await users.getUserById(xss(req.params.userId));
    } catch (e) {
        return res.send(404).render("error", {pageTitle: "Error", status: "404", errorMsg: "User not found"});
    }
    try{
        review = await userReviews.createUserReview(xss(req.session.user.userId), xss(req.params.userId), xss(req.body.reviewingTitle), xss(req.body.reviewingBody), parseInt(xss(req.body.reviewingRating)));
    } catch (e) {
        return res.render("error", {pageTitle: "Error", errorStatus: "500", errorMsg: "Could not Create Review"});
    }
    try{
        reviewList = await userReviews.getUserReviewsByReviewedUserId(xss(req.params.userId))
        res.render("viewUserReviews", {pageTitle: "User Reviews", name: user.username, avgRating: user.averageRating, uid: user._id, reviews: reviewList});
    } catch (e) {
        return res.send(404).render("error", {pageTitle: "Error", status: "404", errorMsg: "User not found"});
    }
});

router.route("/writeGameReview/:gameId").get(async (req, res) => {
    let game;

    try{
        validation.validateObjectID(xss(req.params.gameId));
    } catch (e) {
        return res.send(500).render("error", {pageTitle: "Error", status: "500", errorMsg: "Invalid GameId"});
    }
    try{
        game = await games.getGameById(xss(req.params.gameId));
        res.render("writeReview", {pageTitle: "Write a Review", reviewed: game.gameTitle, gid: xss(req.params.gameId)});
    } catch (e) {
        return res.send(404).render("error", {pageTitle: "Error", status: "404", errorMsg: "Game not found"});
    }

});

router.route("/writeGameReview/:gameId").post(async (req, res) => {
    let game;
    let review;
    let reviewList;

    try{
        validation.validateObjectID(xss(req.params.gameId));
    } catch (e) {
        return res.send(500).render("error", {pageTitle: "Error", status: "500", errorMsg: "Invalid GameId"});
    }
    try{
        game = await games.getGameById(xss(req.params.gameId));
    } catch (e) {
        return res.send(404).render("error", {pageTitle: "Error", status: "404", errorMsg: "Game not found"});
    }
    try{
        review = await gameReviews.createGameReview(xss(req.session.user.userId), xss(req.params.gameId), xss(req.body.reviewingTitle), xss(req.body.reviewingBody), parseInt(xss(req.body.reviewingRating)));
        res.render("writeReview", {gid: xss(req.params.gameId), backToGame: true});
    } catch (e) {
        return res.render("error", {pageTitle: "Error", errorStatus: "500", errorMsg: "Could not Create Review"});
    }
});

export default router;