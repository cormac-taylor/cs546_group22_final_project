import {Router} from 'express';
import {usersData, locationData, gamesData} from '../data/index.js';
import {utils} from '../utilities/utilityIndex.js'
import * as validation from "../utilities/validation.js"
import { games } from '../config/mongoCollections.js';
import xss from "xss"
const router = Router();

router
    .route('/')
    .post(async (req, res) =>{
        if (!xss(req.session.user)){
            return res.redirect('/signin');
        }
        try{
            let currUserId = xss(req.session.user.userId);
            let currGameId = xss(req.body.gid)
            let currUser = await usersData.getUserById(currUserId);
            let currGame = await gamesData.getGameById(currGameId);
            res.render('makeRequest', {
                pageTitle: 'Request Game',
                signedIn: true,
                game: currGame,
            });

        }catch(e){
            //TODO: After creating an error page, present that with error instead
            res.status(500).json({error: e});
        }
    });

    router
    .route('/confirm')
    .post(async (req, res) =>{
        if (!xss(req.session.user)){
            return res.redirect('/signin');
        }
        let errors = [];
        let currGame;
        try{
            let userId = xss(req.session.user.userId);
            let gameId = xss(req.body.gid)
            let reqMsg = xss(req.body.msgbody)
            let currUser = await usersData.getUserById(userId);
            currGame = await gamesData.getGameById(gameId);
            let updatedGame = await gamesData.requestGame(gameId, userId, reqMsg);
            res.render('makeRequest', {
                pageTitle: 'Request Game: Success!',
                signedIn: true,
                requestMade: true,
                game: currGame,
            });

        }catch(e){
            res.status(500).render('makeRequest', {
                pageTitle: 'Request Game: Error',
                signedIn: true,
                errors: [e],
                hasErrors: true,
                game: currGame,
            });
        }
    });

export default router;