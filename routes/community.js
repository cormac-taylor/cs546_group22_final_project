import { Router } from "express";
const router = Router();
import * as validation from "../utilities/validation.js";
import * as gamesapi from "../data/gamesAPI.js"
import * as games from "../data/games.js"
import * as gameReviews from "../data/gameReviews.js"
import * as userReviews from "../data/userReviews.js"
import * as users from "../data/users.js"

router.route("/").get(async (req, res) => {
    return res.render("communityHome");
});

router.route("/:userId").get(async (req, res) => {
    let reviewList;
    let user;

    try{
        validation.validateObjectID(req.params.userId);
    } catch (e) {
        return res.status(500).render("error", {pageTitle: "Error", status: "500", errorMsg: "Invalid UserId"});
    }
    try{
        user = await users.getUserById(req.params.userId);
    } catch (e) {
        return res.status(404).render("error", {pageTitle: "Error", status: "404", errorMsg: "User not found"});
    }
    try{
        reviewList = await userReviews.getUserReviewsByReviewedUserId(req.params.userId)
        res.render("viewUserReviews", {pageTitle: "User Reviews", name: user.username, avgRating: user.averageRating, uid: user._id, reviews: reviewList});
    } catch (e) {
        return res.status(404).render("error", {pageTitle: "Error", status: "404", errorMsg: "User not found"});
    }
});

router.route("/writeUserReview/:userId").get(async (req, res) => {
    let user;

    try{
        validation.validateObjectID(req.params.userId);
    } catch (e) {
        return res.status(500).render("error", {pageTitle: "Error", status: "500", errorMsg: "Invalid UserId"});
    }
    try{
        user = await users.getUserById(req.params.userId);
        res.render("writeReview", {pageTitle: "Write a Review", reviewed: user.username, uid: req.params.userId});
    } catch (e) {
        return res.status(404).render("error", {pageTitle: "Error", status: "404", errorMsg: "User not found"});
    }

});

router.route("/writeUserReview/:userId").post(async (req, res) => {
    let user;
    let review;
    let reviewList;

    try{
        validation.validateObjectID(req.params.userId);
    } catch (e) {
        return res.status(500).render("error", {pageTitle: "Error", status: "500", errorMsg: "Invalid UserId"});
    }
    try{
        user = await users.getUserById(req.params.userId);
    } catch (e) {
        return res.status(404).render("error", {pageTitle: "Error", status: "404", errorMsg: "User not found"});
    }
    try{
        validation.validateTitle(req.body.reviewingTitle)
    } catch(e) {
        return res.status(500).render("error", {pageTitle: "Error", errorStatus: "500", errorMsg: "Title must be between 1 and 64 characters long"});
    }
    try{
        validation.validateBody(req.body.reviewingBody)
    } catch(e) {
        return res.status(500).render("error", {pageTitle: "Error", errorStatus: "500", errorMsg: "Body must be between 16 and 2048 characters long"});
    }
    try{
        validation.validateRating(parseInt(req.body.reviewingRating))
    } catch(e) {
        return res.status(500).render("error", {pageTitle: "Error", errorStatus: "500", errorMsg: "Rating must be an integer between 1 and 5"});
    }
    try{
        review = await userReviews.createUserReview(req.session.user.userId, req.params.userId, req.body.reviewingTitle, req.body.reviewingBody, parseInt(req.body.reviewingRating));
    } catch (e) {
        return res.status(500).render("error", {pageTitle: "Error", errorStatus: "500", errorMsg: "Could not Create Review"});
    }
    try{
        reviewList = await userReviews.getUserReviewsByReviewedUserId(req.params.userId)
        res.render("viewUserReviews", {pageTitle: "User Reviews", name: user.username, avgRating: user.averageRating, uid: user._id, reviews: reviewList});
    } catch (e) {
        return res.status(404).render("error", {pageTitle: "Error", status: "404", errorMsg: "User not found"});
    }
});

router.route("/writeGameReview/:gameId").get(async (req, res) => {
    let game;

    try{
        validation.validateObjectID(req.params.gameId);
    } catch (e) {
        return res.status(500).render("error", {pageTitle: "Error", status: "500", errorMsg: "Invalid GameId"});
    }
    try{
        game = await games.getGameById(req.params.gameId);
        res.render("writeReview", {pageTitle: "Write a Review", reviewed: game.gameTitle, gid: req.params.gameId});
    } catch (e) {
        return res.status(404).render("error", {pageTitle: "Error", status: "404", errorMsg: "Game not found"});
    }

});

router.route("/writeGameReview/:gameId").post(async (req, res) => {
    let game;
    let review;
    let reviewList;

    try{
        validation.validateObjectID(req.params.gameId);
    } catch (e) {
        return res.status(500).render("error", {pageTitle: "Error", status: "500", errorMsg: "Invalid GameId"});
    }
    try{
        game = await games.getGameById(req.params.gameId);
    } catch (e) {
        return res.status(404).render("error", {pageTitle: "Error", status: "404", errorMsg: "Game not found"});
    }
    try{
        validation.validateTitle(req.body.reviewingTitle)
    } catch(e) {
        return res.status(500).render("error", {pageTitle: "Error", errorStatus: "500", errorMsg: "Title must be between 1 and 64 characters long"});
    }
    try{
        validation.validateBody(req.body.reviewingBody)
    } catch(e) {
        return res.status(500).render("error", {pageTitle: "Error", errorStatus: "500", errorMsg: "Body must be between 16 and 2048 characters long"});
    }
    try{
        validation.validateRating(parseInt(req.body.reviewingRating))
    } catch(e) {
        return res.status(500).render("error", {pageTitle: "Error", errorStatus: "500", errorMsg: "Rating must be an integer between 1 and 5"});
    }
    try{
        review = await gameReviews.createGameReview(req.session.user.userId, req.params.gameId, req.body.reviewingTitle, req.body.reviewingBody, parseInt(req.body.reviewingRating));
        res.render("writeReview", {gid: req.params.gameId, backToGame: true});
    } catch (e) {
        return res.render("error", {pageTitle: "Error", errorStatus: "500", errorMsg: "Could not Create Review"});
    }
});

export default router;