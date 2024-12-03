import { Router } from "express";
const router = Router();
import * as validation from "../utilities/validation.js";
import { addEvent } from "../data/events.js";

// Main page for people to see events
router.route("/").get(async (req, res) => {
    // Anyone can see this so no check for cookies
    //console.log("let me see events")
    try {
        res.render("events", { pageTitle: "Local Events" })
        
    } catch (e) {
        res.status(500).json({ error: e })
    }
});

// You have to add the post thing here
router.route("/createEvent").get(async (req, res) => {
    // Anyone can see this so no check for cookies
    //console.log("let me see events")
    try {
        res.render("createEvent", { pageTitle: "Create Event" })
        
    } catch (e) {
        res.status(500).json({ error: e })
    }
})
    .post(async (req, res) => {
        const createEventFormInfo = req.body
        let errors = []
        try{
            createEventFormInfo.username = validation.validateUsername(createEventFormInfo.username)
        }
        catch(e){
            errors.push(`Username ${e}`)
        }

        try{
            createEventFormInfo.email = validation.validateEmail(createEventFormInfo.email)
        }
        catch(e){
            errors.push(`Email ${e}`)
        }
        // try{
        //     createEventFormInfo.location = validation.validateGeoJson(createEventFormInfo.location)
        // }
        // catch(e){
        //     errors.push(`Location ${e}`)
        // }
        //console.log("yo")
        try{
            createEventFormInfo.description = validation.validateString(createEventFormInfo.description)
        }
        catch(e){
            errors.push(`Description ${e}`)
        }
        let result = await addEvent(createEventFormInfo.username, createEventFormInfo.email, createEventFormInfo.location, createEventFormInfo.description)
        return result
        
    });

// router.route("/createEvent").post(async (req, res) =>

// )
export default router;
