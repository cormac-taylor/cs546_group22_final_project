import {Router} from 'express';
import {usersData, locationData} from '../data/index.js';
import * as validation from "../utilities/validation.js"
import bcrypt from 'bcrypt';

const router = Router();

//TODO: Implement a middleware that checks if the user is signed in.
//      If user is signed in, route to the main logged in page
router
    .route('/')
    .get(async (req, res) => {
        try{
            res.render('signup', {
                pageTitle: 'Sign Up'
            });
        } catch(e){
            //TODO: After creating an error page, present that with error instead
            res.status(500).json({error: e});
        }
    })
    .post(async (req, res) => {
        /* User signup verification */
        const userSignupData = req.body;
        let errors = [];
        let plainTextPass;
        try{
            userSignupData.firstName = validation.validateName(userSignupData.firstName)
        }catch (e) {
            errors.push(`First name ${e}`);
        }
        try{
            userSignupData.lastName = validation.validateName(userSignupData.lastName)
        }catch (e) {
            errors.push(`Last name ${e}`);
        }
        try{
            userSignupData.username = validation.validateUsername(userSignupData.username)
        }catch (e) {
            errors.push(`Username ${e}`);
        }
        try{
            userSignupData.email = validation.validateEmail(userSignupData.email)
        }catch (e) {
            errors.push(`Email ${e}`);
        }
        try{
            //TODO: Currently, there is no password validation (2 ints and 2 special chars should be required)
            userSignupData.password = validation.validateString(userSignupData.password)
        }catch (e) {
            errors.push(`Password ${e}`);
        }
        /* Error Display*/
        if (errors.length > 0){
            res.render('signup', {
                pageTitle: 'Sign Up',
                errors: errors,
                hasErrors: true,
                signup: userSignupData
            });
            return;
        }

        try{
            let location = locationData.defaultLocation();
            const {firstName, lastName, username, email, password} = userSignupData
            const newUser = await usersData.createUser(firstName, lastName, username, email, password, location);
            //TODO: Redirect to login page with notification of successful user account creation
            res.redirect(`/home`);
        } catch (e) {
            res.status(500).render('signup', {
                pageTitle: 'Sign Up',
                errors: [e],
                hasErrors: true,
                signup: userSignupData
            });
            return;
        }
    });

export default router;