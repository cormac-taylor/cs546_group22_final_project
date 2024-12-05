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
            res.render("manageGames", { pageTitle: "Manage Games", user: req.session.user.username });
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
            res.render("Boken Boards", { pageTitle: "Home", status: "Please Sign In Before Managing Games!"})
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
        let deleted = await games.removeGameById(req.body.gameID);
        let g = await games.getGamesByOwnerID(req.session.user.userId);
        res.render("removeGame", { pageTitle: "Remove Game", games: g });
    } catch (e) {
        res.status(500).json({ error: e });
    }
});

router.route("/modifyGame").post(async (req,res) => {
    try {
        res.render("updateGamePosting", { pageTitle: "Modify Posting", gid: req.body.gid });
    } catch (e) {
        res.status(500).json({ error: e });
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
    // TODO: allow user entered location
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
