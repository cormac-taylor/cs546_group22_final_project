import {Router} from 'express';
import {usersData} from '../data/index.js';
import {utils} from '../utilities/utilityIndex.js'
import * as validation from "../utilities/validation.js"
import bcrypt from 'bcrypt';
import xss from "xss"
const router = Router();

//TODO: Implement a middleware that checks if the user is signed in.
//      If user is signed in, route to the main logged in page

router
    .route('/')
    .get(async (req, res) => {
        try{
            res.render('signin', {
                pageTitle: 'Sign In'
            });
        } catch(e){
            return res.status(500).render("error", {signedIn: true, pageTitle: "Error", errorStatus: "500", errorMsg: "500 Server Error"});
        }
    })
    .post(async (req, res) => {
        /* User signin verification */
        const userSigninData = req.body;
        let errors = [];
        let plainTextPass;
        try{
            userSigninData.username = validation.validateUsername(xss(userSigninData.username))
        }catch (e) {
            errors.push(`Username ${e}`);
        }
        try{
            plainTextPass = validation.validatePassword(xss(userSigninData.password))
        }catch (e) {
            errors.push(`Password ${e}`);
        }
    /* Error Display*/
    if (errors.length > 0){
        res.render('signin', {
            pageTitle: 'Sign In',
            errors: errors,
            hasErrors: true,
            signin: userSigninData
        });
        return;
    };
    let compareToMatch = false;
    try{    // Verify username and password match
        const user = await usersData.getUserByUsername(userSigninData.username);
        const hash = user.hashedPassword;
        compareToMatch = await bcrypt.compare(plainTextPass, hash);
        // If passwords match, proceed with session
        if (compareToMatch){
            //Route them to their user page and begin their session.
            req.session.user = {username: user.username, email: user.email, userId: user._id}
            return res.redirect('/dashboard');
        } else {
            throw 'Invalid username or password. Please try again.'; // Username exists but incorrect password was entered.
        }
    } catch (e) {
        res.render('signin', {
            pageTitle: 'BokenBoards Sign In',
            //Do not return the reason for the error on the page. Simply render the page with invalidity.
            errors: ['Invalid username or password. Please try again.'],
            hasErrors: true,
            signin: userSigninData
        });
        return;
    }
});

export default router;