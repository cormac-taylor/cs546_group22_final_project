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

export default router;