import { Router } from "express";
const router = Router();
import * as validation from "../utilities/validation.js";
import { addEvent, deleteEvent, getEventsByOwnerId } from "../data/events.js";
import { getUserById, updateUser } from "../data/users.js";


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
    //console.log("let me see events")
    try {
        if (!req.session.user){
            //req.session.errorMessage = null; // Clear the error message after displaying
            res.redirect('/signin');
            //return res.status(401).send('You must be logged in to view this page.')
            // Think about rendering a page here that has a link to go to the log in page
        }
        else{
            let ownerID = req.session.user.userId
            res.render("createEvent", { pageTitle: "Create Event" })
        }
        
        
    } catch (e) {
        res.status(500).json({ error: e })
    }
})
    .post(async (req, res) => {
        const createEventFormInfo = req.body
        let errors = []
        if (!req.session.user){
            res.redirect('/signin');
            // return res.status(401).send('You must be logged in to view this page.')
        }
        let ownerID = req.session.user.userId
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
        let result = await addEvent(ownerID, createEventFormInfo.username, createEventFormInfo.email, createEventFormInfo.location, createEventFormInfo.description, createEventFormInfo.startDate, createEventFormInfo.endDate)
        let user = await getUserById(ownerID)
        // let userEvents = user.eventsCreated
        // console.log(user.eventsCreated)
        // console.log(result)
        // console.log(result.insertedId)
        // console.log(result.insertedId.toString())
        user.eventsCreated.push(result.insertedId.toString())
        console.log(user)
        // console.log(e)
        // console.log(user)
        let updatecurrUser = await updateUser(ownerID, {eventsCreated: user.eventsCreated})
        // console.log(updatecurrUser)
        // const eventId = result.insertedId
        // I can do something like the above but idk how to make the button delete that specific item
        res.render("events", { pageTitle: "Local Events" })
    });

router.route("/updateEvent").get(async (req, res) => {
    try {
        if (!req.session.user){
            return res.status(401).send('You must be logged in to view this page.')
        }
        let ownerID = req.session.user.userId
        const eventList = await getEventsByOwnerId(ownerID)
        res.render("updateEvent", { pageTitle: "Update Event", userId: req.session.user.userId, events: eventList})
        
        
    } catch (e) {
        res.status(500).json({ error: e })
    }
})
    .patch(async (req, res) => {
        
        const { eventName, email, location, description } = req.body
        const updateFields = {}
        if (eventName){
            updateFields.eventName = eventName
        }
        if (email){
            updateFields.email = email
        }
        if (location){
            updateFields.location = location
        }
        if (description){
            updateFields.description = description
        }
        
    })

router.route("/deleteEvent").get(async (req, res) => {
    try {
        if (!req.session.user){
            return res.status(401).send('You must be logged in to view this page.')
        }
        let ownerID = req.session.user.userId
        const eventList = await getEventsByOwnerId(ownerID)
        // console.log(eventList)
        res.render("deleteEvent", { pageTitle: "Delete Event", userId: req.session.user.userId, events: eventList})
        
    } catch (e) {
        res.status(500).json({ error: e })
    }
})

    .post(async (req, res) => {
        let deleted = await deleteEvent(req.body.eventId)

        let ownerID = req.session.user.userId
        const eventList = await getEventsByOwnerId(ownerID)
        // console.log(eventList)
        res.render("deleteEvent", { pageTitle: "Delete Event", userId: req.session.user.userId, events: eventList})

    })
export default router;
