import { Router } from "express";
const router = Router();
import * as validation from "../utilities/validation.js";
import * as gamesapi from "../data/gamesAPI.js"

// main page for managing a user's games
router.route("/").get(async (_, res) => {
  try {
    res.render("manageGames", { pageTitle: "Manage Games" });
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

// routes to a page for a user to begin the process of adding a game to their postings
router.route("/addGame").get(async (req,res) => {
    try {
        res.render("addGame", { pageTitle: "Add Game" });
    } catch (e) {
        res.status(500).json({ error: e });
    }
});

// routed here after user selects a specific game from the api, continues process to add game
router.route("/addGame").post(async (req,res) => {
    try {
        res.render("addGame", { pageTitle: "Add Game", id: req.body.gameID });
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
        res.render("apisearchresults", { pageTitle: "Search Results", games: g, searchByTitle: req.body.searchByTitle });
    } catch (e) {
        res.status(500).json({ error: e });
    }
});

export default router;
