import { Router } from "express";
const router = Router();
import * as validation from "../utilities/validation.js";
import * as gamesapi from "../data/gamesAPI.js"
import * as games from "../data/games.js"

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
            res.render("manageGames", { pageTitle: "Manage Games" });
        }
        else {
            res.render("home", { pageTitle: "Home", status: "Please Sign In Before Managing Games!"})
        }
    } catch (e) {
        res.status(500).json({ error: e });
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
        res.status(500).json({ error: e });
    }
    try {
        if (signedin) {
            res.render("addGame", { pageTitle: "Add Game" });
        }
        else {
            res.render("home", { pageTitle: "Home", status: "Please Sign In Before Managing Games!"})
        }
    } catch (e) {
        res.status(500).json({ error: e });
    }
});

// routed here after user selects a specific game from the api, continues process to add game
router.route("/addGame1").post(async (req,res) => {
    try {
        if(!req.body.gid) {throw 'Error: Game not selected'}
    } catch (e) {
        res.status(404).json({ error: e });
    }
    try {
        // games.createGame("674a82432950296bf59e615b", {type: "Point", coordinates: [-73.856077, 40.848447]}, req.body.title, game.description._text, "new", game.image._text) // using seed user for now
        res.render("addGame", { pageTitle: "Add Game", gid: req.body.gid, title: req.body.title, status1: " Selected! Please enter the condition of the game." });
    } catch (e) {
        res.status(500).json({ error: e });
    }
});

router.route("/addGame2").post(async (req,res) => {
    try {
        if(!req.body.gid) {throw 'Error: Game not selected'}
    } catch (e) {
        res.status(404).json({ error: e });
    }
    try {
        let game = await gamesapi.searchGamesByID(parseInt(req.body.gid));
        // console.log(game.name._text)
        games.createGame(req.session.user.userId, {type: "Point", coordinates: [-73.856077, 40.848447]}, req.body.title, game.description._text, req.body.cond, game.image._text) // using seed user for now
        res.render("addGame", { pageTitle: "Add Game", status2: "Game added! Add another or navigate back using the button below." });
    } catch (e) {
        res.status(500).json({ error: e });
    }
});

// displays all search results from api, this page allows the user to select which game they want to add
router.route("/apigamesearch").post(async (req,res) => {
    try {
        if(!req.body.searchByTitle.trim()) {throw 'You must enter a search term!'}
    } catch (e) {
        // return res.status(400).render('error', {er: "400", c: "error", message: e})
        return res.status(400).json({error: e});
    }
    try {
        let g = await gamesapi.searchGamesByTitle(req.body.searchByTitle);
        res.render("apisearchresults", { pageTitle: "Search Results", games: g, searchByTitle: req.body.searchByTitle, adding: "testing" });
    } catch (e) {
        res.status(500).json({ error: e });
    }
});

router.route("/removeGame").get(async (req,res) => {
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
            let g = await games.getGamesByOwnerID(req.session.user.userId)
            res.render("removeGame", { pageTitle: "Remove Game", games: g });
        }
        else {
            res.render("home", { pageTitle: "Home", status: "Please Sign In Before Managing Games!"})
        }
    } catch (e) {
        res.status(500).json({ error: e });
    }
});

router.route("/removeGame").post(async (req,res) => {
    try {
        let deleted = await games.removeGameById(req.body.gameID)
        let g = await games.getGamesByOwnerID(req.session.user.userId) // using a seed user for now
        res.render("removeGame", { pageTitle: "Remove Game", games: g });
    } catch (e) {
        res.status(500).json({ error: e });
    }
});

export default router;
