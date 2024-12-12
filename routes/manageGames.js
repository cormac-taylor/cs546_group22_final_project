import { Router } from "express";
const router = Router();
import * as validation from "../utilities/validation.js";
import * as gamesapi from "../data/gamesAPI.js"
import * as games from "../data/games.js"
import * as users from "../data/users.js"

// main page for managing a user's games
router.route("/").get(async (req, res) => {
    let signedin = false;
    try {
        if (req.session.user) {
            signedin = true;
        }
    } catch (e) {
        res.status(500).json({ error: e });
    }
    try {
        if (signedin) {
            res.render("manageGames", { pageTitle: "Manage Games", user: req.session.user.username });
        }
        else {
            res.render("home", { pageTitle: "Home", status: "Please Sign In Before Managing Games!"})
        }
    } catch (e) {
        return res.status(500).render("error", {pageTitle: "Error", errorStatus: "500", errorMsg: e});
    }
});

// routes to a page for a user to begin the process of adding a game to their postings
router.route("/addGame").get(async (req,res) => {
    let signedin = false;
    try {
        if (req.session.user) {
            signedin = true;
        }
    } catch (e) {
        return res.status(500).render("error", {pageTitle: "Error", errorStatus: "500", errorMsg: e});
    }
    try {
        if (signedin) {
            res.render("addGame", { pageTitle: "Add Game" });
        }
        else {
            res.render("Boken Boards", { pageTitle: "Home", status: "Please Sign In Before Managing Games!"})
        }
    } catch (e) {
        return res.status(500).render("error", {pageTitle: "Error", errorStatus: "500", errorMsg: e});
    }
});

// routed here after user selects a specific game from the api, continues process to add game
router.route("/addGame1").post(async (req,res) => {
    try {
        if(!req.body.gid) {throw 'Error: Game not selected'}
    } catch (e) {
        return res.status(404).render("error", {pageTitle: "Error", errorStatus: "404", errorMsg: e});
    }
    try {
        res.render("addGame", { pageTitle: "Add Game", gid: req.body.gid, title: req.body.title, status1: " Selected! Please enter the condition of the game." });
    } catch (e) {
        return res.status(500).render("error", {pageTitle: "Error", errorStatus: "500", errorMsg: e});
    }
});

router.route("/addGame2").post(async (req,res) => {
    let user;
    try{
        user = await users.getUserById(req.session.user.userId)
    } catch(e) {
        return res.status(404).render("error", {pageTitle: "Error", errorStatus: "404", errorMsg: "User not found"});
    }
    try {
        if(!req.body.gid) {throw 'Error: Game not selected'}
    } catch (e) {
        return res.status(404).render("error", {pageTitle: "Error", errorStatus: "404", errorMsg: e});
    }
    try {
        let game = await gamesapi.searchGamesByID(parseInt(req.body.gid));
        let gimg;
        if (game.image){
            gimg = game.image._text;
        }
        else {
            gimg = "https://st4.depositphotos.com/14953852/24787/v/450/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg"
        }
        await games.createGame(req.session.user.userId, user.location.geometry, req.body.title, game.description._text, req.body.cond, gimg) 
        res.render("addGame", { pageTitle: "Add Game", status2: "Game added! Add another or navigate back using the button below." });
    } catch (e) {
        return res.status(500).render("error", {pageTitle: "Error", errorStatus: "500", errorMsg: e});
    }
});

// displays all search results from api, this page allows the user to select which game they want to add
router.route("/apigamesearch").post(async (req,res) => {
    try {
        if(!req.body.searchByTitle.trim()) {throw 'You must enter a search term!'}
        validation.validateString(req.body.searchByTitle);
    } catch (e) {
        // return res.status(400).render('error', {er: "400", c: "error", message: e})
        return res.status(400).render("error", {pageTitle: "Error", errorStatus: "400", errorMsg: e});
    }
    try {
        let g = await gamesapi.searchGamesByTitle(req.body.searchByTitle);
        if(req.body.searchDiscover){
            res.render("apisearchresults", { pageTitle: "Search Results", games: g, searchByTitle: req.body.searchByTitle, searchDiscover: true });
        }
        else{
            res.render("apisearchresults", { pageTitle: "Search Results", games: g, searchByTitle: req.body.searchByTitle, postGame: true });
        }
    } catch (e) {
        return res.status(500).render("error", {pageTitle: "Error", errorStatus: "500", errorMsg: e});
    }
});

router.route("/removeGame").get(async (req,res) => {
    let signedin = false;
    try {
        if (req.session.user) {
            signedin = true;
        }
    } catch (e) {
        return res.status(500).render("error", {pageTitle: "Error", errorStatus: "500", errorMsg: e});
    }
    try {
        if (signedin) {
            let g = await games.getGamesByOwnerID(req.session.user.userId)
            res.render("removeGame", { pageTitle: "Remove Game", games: g });
        }
        else {
            res.render("home", { pageTitle: "Home", status: "Please Sign In Before Managing Games!"})
        }
    } catch (e) {
        return res.status(500).render("error", {pageTitle: "Error", errorStatus: "500", errorMsg: e});
    }
});

router.route("/removeGame").post(async (req,res) => {
    try {
        let deleted = await games.removeGameById(req.body.gameID);
        let g = await games.getGamesByOwnerID(req.session.user.userId);
        res.render("removeGame", { pageTitle: "Remove Game", games: g });
    } catch (e) {
        return res.status(500).render("error", {pageTitle: "Error", errorStatus: "500", errorMsg: e});
    }
});

router.route("/modifyGame").post(async (req,res) => {
    try {
        validation.validateObjectID(req.body.gid)
        if(!req.body.gid) {throw 'Game must be selected'}
        res.render("updateGamePosting", { pageTitle: "Modify Posting", gid: req.body.gid });
    } catch (e) {
        return res.status(500).render("error", {pageTitle: "Error", errorStatus: "500", errorMsg: e});
    }
});

router.route("/modifyGameUpdate").post(async (req,res) => {
    const updatedData = req.body;
    let errors = [];
    if (updatedData.condition){
        try{
            updatedData.condition = validation.validateCondition(updatedData.condition);
        }catch (e) {
            errors.push(`Condition ${e}`);
        }
    }
    // TODO: allow user enetered location
    if (updatedData.location){
        try{
            updatedData.condition = validation.validateGeoJson(updatedData.location);
        }catch (e) {
            errors.push(`Location ${e}`);
        }
    }

    if (errors.length > 0){
        res.render('updateGamePosting', {
            pageTitle: 'Update Game',
            errors: errors,
            hasErrors: true
        });
        return;
    }

    try{
        const updatedGame = await games.updateGame(req.body.gid, updatedData);
        res.render('updateGamePosting', {
            pageTitle: 'Update Game',
            success: true
        });
    } catch (e){
        res.status(500).render('updateGamePosting', {
            pageTitle: 'Update Game: Error',
            errors: [e],
            hasErrors: true
        });
        return;
    }
});

export default router;
