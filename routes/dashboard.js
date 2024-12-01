import {Router} from 'express';
import {usersData, locationData} from '../data/index.js';
import {utils} from '../utilities/utilityIndex.js'
import * as validation from "../utilities/validation.js"

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
    .route('/:username')
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
            res.render('dashboard', {
                pageTitle: 'Sign Up',
                user: currUser
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
                user: currUser
            });
        } catch(e){
            //TODO: After creating an error page, present that with error instead
            res.status(500).json({error: e});
        }
    })
    .post(async (req, res) =>{
        console.log('Hit Route')
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
            res.render('Update Profile', {
                pageTitle: 'Update Profile',
                errors: errors,
                hasErrors: true,
                user: updatedData
            });
            return;
        }
        /* If user entered valid data*/
        try{
            if (updatedData.password){
                updatedData.password = await utils.hashPassword(password);
            }
            const updatedUser = await usersData.updateUser(userId, updatedData);

            req.session.user = {username: user.username, email: user.email, userId: user._id}
            return res.redirect('/dashboard');

        } catch (e){
            res.status(500).render('updateProfile', {
                pageTitle: 'Update Profile: Error',
                errors: [e],
                hasErrors: true,
                user: updatedData
            });
            return;
        }

    });

export default router;