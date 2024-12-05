import {Router} from 'express';
import {usersData, locationData, gamesData} from '../data/index.js';
import {utils} from '../utilities/utilityIndex.js'
import * as validation from "../utilities/validation.js"
import { games } from '../config/mongoCollections.js';

const router = Router();

router
// TODO: Handle user going to /dashboard without /'username'
    .route('/')
    .get(async (req, res) => {
    if (req.session.user){
        return res.redirect(`/dashboard/${req.session.user.username}`);
    } else {
        return res.redirect('/signin');
    }
});

router
    .route('/viewrequest')
    .post(async (req, res) =>{
        if (!req.session.user){
            return res.status(401).send('You must be logged in to view this page.')
        }
        try{
            let userId = req.session.user.userId;
            let reqId = validation.validateObjectID(req.body.reqUserId);
            let gameId = validation.validateObjectID(req.body.reqGame);
            let reqObj = await gamesData.returnRequest(gameId.toString(), reqId.toString());
            let reqMsg = reqObj.message;
            let currUser = await usersData.getUserById(userId);
            let reqUser = await usersData.getUserById(reqId.toString());
            let reqGame = await gamesData.getGameById(gameId.toString());
            res.render('viewRequest', {
                pageTitle: 'View Game Request',
                signedIn: true,
                reqUser,
                reqGame,
                reqMsg,
            });
        }catch(e){
            //TODO: After creating an error page, present that with error instead
            res.status(500).json({error: e});
        }
    });

router
    .route('/viewrequest/approve')
    .post(async (req, res) =>{
        if (!req.session.user){
            return res.status(401).send('You must be logged in to view this page.')
        }
        try{
            let userId = req.session.user.userId;
            let reqId = validation.validateObjectID(req.body.reqUserId);
            let gameId = validation.validateObjectID(req.body.reqGame);
            let reqObj = await gamesData.returnRequest(gameId.toString(), reqId.toString());
            let reqMsg = reqObj.message;
            let approveStr = validation.validateString(req.body.approve);
            let approveVal = ((str) => str === 'true')(approveStr);
            let currUser = await usersData.getUserById(userId);
            let reqUser = await usersData.getUserById(reqId.toString());
            let reqGame = await gamesData.getGameById(gameId.toString());
            if (reqGame.ownerID.toString() !== userId) throw `Error: This game does not belong to you!`;

            /* Updates the game object by removing the request and setting game borrowed status accordingly */
            reqGame = await gamesData.handleRequest(gameId.toString(), reqId.toString(), approveVal);

            res.render('viewRequest', {
                pageTitle: 'View Game Request',
                signedIn: true,
                requestHandled: true,
                approveVal,
                reqUser,
                reqGame,
                reqMsg,
            });
        }catch(e){
            //TODO: After creating an error page, present that with error instead
            res.status(500).json({error: e});
        }
    });

// TODO: Add list of requested games to dashboard
router
    .route('/:username')
    .get(async (req, res) => {
        try{
            if (!req.session.user){
                return res.status(401).send('You must be logged in to view this page.')
            }
            let userId = req.session.user.userId;
            let currUser = await usersData.getUserById(userId);
            let currGames = await gamesData.getGamesByOwnerID(userId);
            let hasGames = false;
            let hasReqs = false;
            let requests = [];
            if (currGames) hasGames = true;
            for (let game of currGames){
                if (game.requests !== undefined && game.requests.length !== 0){
                    hasReqs = true;
                    for (let request of game.requests){
                        let reqUser = await usersData.getUserById(request.reqUserId.toString());
                        let reqObj = {
                            reqUserId: reqUser._id,
                            gameId: game._id,
                            reqUsername: reqUser.username,
                            reqFirstName: reqUser.firstName,
                            reqLastName: reqUser.lastName,
                            reqUserMsg: request.message,
                        }
                        requests.push(reqObj);
                    }
                }
            }
            // Ensure session name matches URL
            if (req.params.username !== req.session.user.username){
                return res.status(403).json({error: e});
            }
            res.render('dashboard', {
                pageTitle: 'BokenBoards Dashboard',
                signedIn: true,
                user: currUser,
                hasGames: hasGames,
                games: currGames,
                hasReqs: hasReqs,
                requests: requests,
            });
        } catch(e){
            //TODO: After creating an error page, present that with error instead
            res.status(500).json({error: e});
        }
});

router
    .route('/:username/update')
    .get(async (req, res) => {
        try{
            if (!req.session.user){
                return res.status(401).send('You must be logged in to view this page.')
            }
            let userId = req.session.user.userId;
            let currUser = await usersData.getUserById(userId);

            // Ensure session name matches URL
            if (req.params.username !== req.session.user.username){
                return res.status(403).json({error: e});
            }
            res.render('updateProfile', {
                pageTitle: 'Update Profile',
                signedIn: true,
                user: currUser
            });
        } catch(e){
            //TODO: After creating an error page, present that with error instead
            res.status(500).json({error: e});
        }
    })
    .post(async (req, res) =>{
        let userId;
        let currUser;
        try{
            // Ensure there is a valid session for user
            if (!req.session.user){
                return res.status(401).send('You must be logged in to view this page.')
            }
            userId = req.session.user.userId;
            currUser = await usersData.getUserById(userId);

            // Ensure session name matches URL
            if (req.params.username !== req.session.user.username){
                return res.status(403).json({error: e});
            }
        } catch(e){
            //TODO: After creating an error page, present that with error instead
            res.status(500).json({error: e});
        }

        /* Verification of user updated data */
        const updatedData = req.body;
        let errors = [];
        if (updatedData.firstName){
            try{
                updatedData.firstName = validation.validateName(updatedData.firstName)
            }catch (e) {
                errors.push(`First name ${e}`);
            }
        }
        if (updatedData.lastName){
            try{
                updatedData.lastName = validation.validateName(updatedData.lastName)
            }catch (e) {
                errors.push(`Last name ${e}`);
            }
        }
        if (updatedData.username){
            try{
                updatedData.username = validation.validateUsername(updatedData.username)
            }catch (e) {
                errors.push(`Username ${e}`);
            }
        }
        if (updatedData.email){
            try{
                updatedData.email = validation.validateEmail(updatedData.email);
            }catch (e) {
                errors.push(`Email ${e}`);
            }
        }
        if (updatedData.password){
            try{
                //TODO: Currently, there is no password validation (2 ints and 2 special chars should be required)
                updatedData.password = validation.validateString(updatedData.password);
            }catch (e) {
                errors.push(`Password ${e}`);
            }
        }
        /* Error Display*/
        if (errors.length > 0){
            res.render('updateProfile', {
                pageTitle: 'Update Profile',
                signedIn: true,
                errors: errors,
                hasErrors: true,
                user: updatedData
            });
            return;
        }
        /* If user entered valid data*/
        try{
            const updatedUser = await usersData.updateUser(userId, updatedData);
            req.session.user = {username: updatedUser.username, email: updatedUser.email, userId: updatedUser._id};
            res.render('updateProfile', {
                pageTitle: 'dashboard',
                signedIn: true,
                success: true,
                user: updatedUser
            });
        } catch (e){
            res.status(500).render('updateProfile', {
                pageTitle: 'Update Profile: Error',
                signedIn: true,
                errors: [e],
                hasErrors: true,
                user: updatedData
            });
            return;
        }

    });

export default router;