import { Router } from "express";
const router = Router();
import * as validation from "../utilities/validation.js";
import * as gamesapi from "../data/gamesAPI.js"
import * as games from "../data/games.js"
import xss from "xss"
import * as users from "../data/users.js"
import { locationData } from "../data/index.js";


// main page for managing a user's games
router.route("/").get(async (req, res) => {
    let signedin = false;
    try {
        if (req.session.user) {
            signedin = true;
        }
    } catch (e) {
        return res.status(500).render("error", {signedIn: true, pageTitle: "Error", errorStatus: "500", errorMsg: "500 Server Error"});
    }
    try {
        if (signedin) {
            res.render("manageGames", { signedIn: true, pageTitle: "Manage Games", user: req.session.user.username });
        }
        else {
            res.render("signin", { pageTitle: "Sign In", status: "Please Sign In Before Managing Games!"})
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
            res.render("addGame", { signedin: true, pageTitle: "Add Game" });
        }
        else {
            res.render("signin", { pageTitle: "Sign In", status: "Please Sign In Before Managing Games!"})
        }
    } catch (e) {
        return res.status(500).render("error", {pageTitle: "Error", errorStatus: "500", errorMsg: e});
    }
});

// routed here after user selects a specific game from the api, continues process to add game
router.route("/addGame1").post(async (req,res) => {
    if(req.session.user){
        try {
            if(!xss(req.body.gid)) {throw 'Error: Game not selected'}
        } catch (e) {
            return res.status(404).render("error", {signedIn: true, pageTitle: "Error", errorStatus: "404", errorMsg: e});
        }
        try {
            res.render("addGame", { signedIn: true, pageTitle: "Add Game", gid: xss(req.body.gid), title: xss(req.body.title), status1: " Selected! Please enter the condition of the game." });
        } catch (e) {
            return res.status(500).render("error", {signedIn: true, pageTitle: "Error", errorStatus: "500", errorMsg: e});
        }
    }
    else {
        res.render("signin", { pageTitle: "Sign In", status: "Please Sign In Before Managing Games!"})
    }
});

router.route("/addGame2").post(async (req,res) => {
    if(req.session.user){
        let user;
        try{
            user = await users.getUserById(req.session.user.userId)
        } catch(e) {
            return res.status(404).render("error", {signedIn: true, pageTitle: "Error", errorStatus: "404", errorMsg: "User not found"});
        }
        try {
            if(!xss(req.body.gid)) {throw 'Error: Game not selected'}
        } catch (e) {
            return res.status(404).render("error", {signedIn: true, pageTitle: "Error", errorStatus: "404", errorMsg: e});
        }
        try {
            let game = await gamesapi.searchGamesByID(parseInt(xss(req.body.gid)));
            let gimg;
            if (game.image){
                gimg = game.image._text;
            }
            else {
                gimg = "https://st4.depositphotos.com/14953852/24787/v/450/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg"
            }
            await games.createGame(req.session.user.userId, user.location, xss(req.body.title), game.description._text, xss(req.body.cond), gimg) 
            res.render("addGame", { signedIn: true, pageTitle: "Add Game", status2: "Game added! Add another or navigate back using the button below." });
        } catch (e) {
            return res.status(500).render("error", {signedIn: true, pageTitle: "Error", errorStatus: "500", errorMsg: e});
        }
    }
    else {
        res.render("signin", { pageTitle: "Sign In", status: "Please Sign In Before Managing Games!"})
    }
});

// displays all search results from api, this page allows the user to select which game they want to add
router.route("/apigamesearch").post(async (req,res) => {
    if(req.session.user){
        let searchAll = false;
        try {
            if(!xss(req.body.searchByTitle.trim()) && !xss(req.body.postGame)) {
                searchAll = true;
            }
            else if (!xss(req.body.searchByTitle.trim())) {
                throw 'must enter a search term'
            }
            else {
                validation.validateString(xss(req.body.searchByTitle));
            }
        } catch (e) {
            // return res.status(400).render('error', {er: "400", c: "error", message: e})
            return res.status(400).render("error", {signedIn: true, pageTitle: "Error", errorStatus: "400", errorMsg: e});
        }
        // try{
        //     if(!xss(req.body.sortBy) || (xss(req.body.sortBy) !== "closest" && xss(req.body.sortBy) !== "rating")) {throw 'Please select a Sorting Metric'}
        // } catch(e){
        //     return res.status(500).render("error", {signedIn: true, pageTitle: "Error", errorStatus: "500", errorMsg: "Please select Closest To You or Highest Rating to Sort"});
        // }
        try {
            if(xss(req.body.sortDist)){
                validation.validateFloat(parseFloat(xss(req.body.sortDist)))
                if(xss(req.body.sortDist) <= 0) {
                    throw 'sort dist must be greater than 0'
                }
            }
        } catch(e) {
            return res.status(500).render("error", {signedIn: true, pageTitle: "Error", errorStatus: "500", errorMsg: "Search Radius Must be a Valid Number Greater than 0"});
        }
        try {
            let g;
            if(!searchAll) {
                g = await gamesapi.searchGamesByTitle(xss(req.body.searchByTitle));
            }
            if(xss(req.body.searchDiscover)){
                if(searchAll) {
                    let user;
                    let sortDist;
                    try {
                        user = await users.getUserById(req.session.user.userId);
                    } catch (e) {
                        return res.status(404).render("error", {pageTitle: "Error", errorStatus: "404", errorMsg: "User not found"});
                    }
                    try {
                        if(!xss(req.body.sortBy) || (xss(req.body.sortBy) !== "closest" && xss(req.body.sortBy) !== "rating")) {
                            throw 'Please select a Sorting Metric'
                        }
                    } catch(e) {
                        return res.status(500).render("error", {pageTitle: "Error", errorStatus: "500", errorMsg: "Please Select Closest or By Rating to Sort"});
                    }
                    try {
                        if(xss(req.body.sortDist)) {
                            sortDist = validation.validateFloat(parseFloat(xss(req.body.sortDist)));
                        }
                    } catch(e) {
                        return res.status(500).render("error", {pageTitle: "Error", errorStatus: "500", errorMsg: "Please enter a valid number for the search radius"});
                    }
                    try {
                        let g;
                        if(xss(req.body.sortBy) === "closest"){
                            g = await games.sortByClosestLocation(user.location.geometry, req.session.user.userId);
                        }
                        if(xss(req.body.sortBy) === "rating") {
                            g = await games.sortByRating(user.location.geometry, req.session.user.userId);
                        }
                        if(xss(req.body.sortDist)) {
                            g = await games.filterByDistance(user.location.geometry, req.session.user.userId, parseFloat(sortDist), g);
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
                        return res.status(500).render("error", {pageTitle: "Error", errorStatus: "500", errorMsg: "500 Server Error"});
                    }
                }
                else{
                    res.render("apisearchresults", { signedIn: true, pageTitle: "Search Results", games: g, searchByTitle: xss(req.body.searchByTitle), searchDiscover: true, sortBy: xss(req.body.sortBy), sortDist: xss(req.body.sortDist), searchAll: searchAll });
                }
            }
            else{
                res.render("apisearchresults", { signedIn: true, pageTitle: "Search Results", games: g, searchByTitle: xss(req.body.searchByTitle), postGame: true });
            }
        } catch (e) {
            return res.status(500).render("error", {signedIn: true, pageTitle: "Error", errorStatus: "500", errorMsg: "500 Server Error"});
        }
    }
    else {
        res.render("signin", { pageTitle: "Sign In", status: "Please Sign In Before Managing Games!"})
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
            res.render("removeGame", { signedIn: true, pageTitle: "Remove Game", games: g });
        }
        else {
            res.render("home", {signedIn: false, pageTitle: "Home", status: "Please Sign In Before Managing Games!"})
        }
    } catch (e) {
        return res.status(500).render("error", {pageTitle: "Error", errorStatus: "500", errorMsg: e});
    }
});

router.route("/removeGame").post(async (req,res) => {
    if(req.session.user){
        try {
            let deleted = await games.removeGameById(xss(req.body.gameID));
            let g = await games.getGamesByOwnerID(req.session.user.userId);
            res.render("removeGame", { signedIn: true, pageTitle: "Remove Game", games: g });
        } catch (e) {
            return res.status(500).render("error", {signedIn: true, pageTitle: "Error", errorStatus: "500", errorMsg: e});
        }
    }
    else {
        res.render("signin", { pageTitle: "Sign In", status: "Please Sign In Before Managing Games!"})
    }
});

router.route("/modifyGame").post(async (req,res) => {
    if(req.session.user){    
        let game;
        try{
            game = await games.getGameById(xss(req.body.gid));
        } catch(e) {
            return res.status(404).render("error", {signedIn: true, pageTitle: "Error", errorStatus: "404", errorMsg: "Game not Found"});
        }
        try {
            validation.validateObjectID(xss(req.body.gid))
            if(!xss(req.body.gid)) {throw 'Game must be selected'}
            res.render("updateGamePosting", { signedIn: true, pageTitle: "Modify Posting", gid: xss(req.body.gid), game: game });
        } catch (e) {
            return res.status(500).render("error", {signedIn: true, pageTitle: "Error", errorStatus: "500", errorMsg: "500 Server Error"});
        }
    }
    else {
        res.render("signin", { pageTitle: "Sign In", status: "Please Sign In Before Managing Games!"})
    }
});

router.route("/modifyGameUpdate").post(async (req,res) => {
    if(req.session.user){
        let game;
        try{
            game = await games.getGameById(xss(req.body.gid));        
        } catch(e) {
            return res.status(404).render("error", {signedIn: true, pageTitle: "Error", errorStatus: "404", errorMsg: "Game not found"});
        }
        const updatedData = req.body;
        let errors = [];
        if (xss(updatedData.condition)){
            try{
                updatedData.condition = validation.validateCondition(xss(updatedData.condition));
            }catch (e) {
                errors.push(`Condition ${e}`);
            }
        }
        // TODO: allow user enetered location
        if (xss(updatedData.location)){
                try{
                    let trimbleLoc = await locationData.geocodeAddress(xss(updatedData.location))
                    updatedData.location = await locationData.makeGeoJSON(trimbleLoc);
                }catch (e) {
                    errors.push(`Location ${e}`);
                }
        }
        
        if (errors.length > 0){
            res.render('updateGamePosting', {
                pageTitle: 'Update Game',
                errors: errors,
                hasErrors: true,
                signedIn: true,
                game: game,
                gid: xss(req.body.gid)
            });
            return;
        }
        
        try{
            const updatedGame = await games.updateGame(xss(req.body.gid), updatedData);
            res.render('updateGamePosting', {
                pageTitle: 'Update Game',
                success: true,
                signedIn: true,
                game: updatedGame,
                gid: xss(req.body.gid)

            });
        } catch (e){
            res.status(500).render('updateGamePosting', {
                pageTitle: 'Update Game: Error',
                errors: [e],
                hasErrors: true,
                signedIn: true,
                game: game,
                gid: xss(req.body.gid)
            });
            return;
        }
    }
    else {
        res.render("signin", { pageTitle: "Sign In", status: "Please Sign In Before Managing Games!"});
    }
});

router.route("/borrowedGames").get(async (req,res) => {
    if(req.session.user){
        try {
            let borrowed = await games.getBorrowedGames(req.session.user.userId);
            res.render("borrowed", {signedIn: true, pageTitle: "Borrowed Games", games: borrowed});
        } catch(e) {
            return res.status(500).render("error", {signedIn: true, pageTitle: "Error", errorStatus: "500", errorMsg: e});
        }
    }
    else {
        res.render("signin", { pageTitle: "Sign In" });
    }

});

router.route("/returnBorrowed").post(async (req,res) => {
    if(req.session.user){
        let game;
        try{
            game = await games.getGameById(xss(req.body.gid));
        } catch(e) {
            return res.status(404).render("error", {signedIn: true, pageTitle: "Error", errorStatus: "404", errorMsg: "Game not found"});
        }
        try{
            if(!xss(req.body.gid)) {
                throw 'Error: Game not selected'
            }
            validation.validateObjectID(xss(req.body.gid));
            if(req.session.user.userId !== game.borrowed.toString()) {
                throw 'Error: You are not currently borrowing this game.'
            }
        } catch(e) {
            return res.status(500).render("error", {signedIn: true, pageTitle: "Error", errorStatus: "500", errorMsg: e});
        }

        try {
            let returned = await games.returnGame(xss(req.body.gid));
            res.render("borrowed", {signedIn: true, pageTitle: "Borrowed Games", returned: "Succesfully Returned!"});
        } catch(e) {
            return res.status(500).render("error", {signedIn: true, pageTitle: "Error", errorStatus: "500", errorMsg: e});
        }
    }
    else {
        res.render("signin", { pageTitle: "Sign In" });
    }

});

export default router;
