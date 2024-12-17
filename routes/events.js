import { Router } from "express";
const router = Router();
import * as validation from "../utilities/validation.js";
import {
  addEvent,
  deleteEvent,
  getEventById,
  getEventsByOwnerId,
  updateEvent,
} from "../data/events.js";
import { getUserById, updateUser } from "../data/users.js";
import { events } from "../config/mongoCollections.js";
import xss from "xss";
import { simplify } from "@turf/turf";

// Main page for people to see events
router.route("/").get(async (req, res) => {
  // Anyone can see this so no check for cookies
  //console.log("let me see events")
  try {
    let formattedEvents
    try{
        const eventsCollection = await events();
        const allEvents = await eventsCollection.find({}).toArray();
        formattedEvents = allEvents.map((event) => ({
        title: event.eventName,
        start: event.Date,
        //   end: event.endDate || null,
        description: event.description || "",
        id: event._id,
        email: event.email
        }));
    }
    catch(e){
        return res.status(404).render("error", {signedIn: true, pageTitle: "Error", errorStatus: "404", errorMsg: "Events not found"});;
    }
    
    let signedIn = req.session.user ? true : false;
    res.render("events", {
      pageTitle: "Local Events",
      events: JSON.stringify(formattedEvents),
      signedIn: signedIn
    });
  } catch (e) {
    return res.status(500).render("error", {signedIn: true, pageTitle: "Error", errorStatus: "500", errorMsg: e});;
  }
});

// You have to add the post thing here
router
  .route("/createEvent")
  .get(async (req, res) => {
    //console.log("let me see events")
    try {
      if (!req.session.user) {
        //req.session.errorMessage = null; // Clear the error message after displaying
        res.redirect("/signin");
        //return res.status(401).send('You must be logged in to view this page.')
        // Think about rendering a page here that has a link to go to the log in page
      } else {
        let ownerID = req.session.user.userId;
        let signedIn = req.session.user ? true : false;
        res.render("createEvent", { signedIn: true, pageTitle: "Create Event" });
      }
    } catch (e) {
      return res.status(500).render("error", {signedIn: true, pageTitle: "Error", errorStatus: "500", errorMsg: e});
    }
  })
  .post(async (req, res) => {
    try{
        const createEventFormInfo = req.body;
        let errors = [];
        if (!req.session.user) {
            return res.redirect("/signin");
          // return res.status(401).send('You must be logged in to view this page.')
        }
        let owner
        let ownerID = req.session.user.userId;
        try{
            
            owner = await getUserById(ownerID)
        }
        catch(e){
            return res.status(404).render("error", {signedIn: true, pageTitle: "Error", errorStatus: "404", errorMsg: "User not found"});;
        }
        
        
        try{
            createEventFormInfo.location = validation.validateLocation(createEventFormInfo.location)
        }
        catch(e){
            return res.status(400).render("error", { signedIn: true, pageTitle: "Error", errorStatus: "400", errorMsg: "Format has to be 'city, state' for location" });
            
        }
        
        try{
            if (!createEventFormInfo.eventName.trim()) throw "No event name given"
            if (!createEventFormInfo.description.trim()) throw "No description given"
        }
        catch(e){
            return res.status(400).render("error", {signedIn: true, pageTitle: "Error", errorStatus: "400", errorMsg: e});;
        }
        try {
          createEventFormInfo.description = validation.validateString(
            xss(createEventFormInfo.description)
          );
        } catch (e) {
          errors.push(`Description ${e}`);
        }
    
        const today = new Date()
        const formattedToday = today.toISOString().split('T')[0];
        // let dateCreated = formattedToday
        // console.log(formattedToday)
        // console.log(createEventFormInfo.Date)
        
        if (formattedToday > createEventFormInfo.Date){
            return res.status(500).render("error", { signedIn: true, pageTitle: "Error", errorStatus: "500", errorMsg: "You cannot create an Event for the past" });
            
        }
        
        // I need to check if todays date matches up with one of th edates of the events in the db
        let ownerEvents
        try{
            ownerEvents = await getEventsByOwnerId(ownerID)
        }
        catch(e){
            return res.status(404).render("error", {signedIn: true, pageTitle: "Error", errorStatus: "404", errorMsg: "Owner's Events not found"});;
        }
        if (!ownerEvents){
            return res.status(404).render("error", { signedIn: true, pageTitle: "Error", errorStatus: "404", errorMsg: "Owner's Events not found" });
        }
        for (let event of ownerEvents){
            if (event.dateCreated === formattedToday) throw 'You can only create one event per day. Try again tomorrow!'
        }

        let result = await addEvent(
          ownerID,
          owner.username,
          xss(createEventFormInfo.eventName),
          owner.email,
          createEventFormInfo.location,
          createEventFormInfo.description,
          xss(createEventFormInfo.Date),
          formattedToday,
          [ownerID]
        );
        // let user = await getUserById(ownerID)
        // user.eventsCreated.push(result.insertedId.toString())
        // console.log(user)
        // let updatecurrUser = await updateUser(ownerID, {eventsCreated: user.eventsCreated})
        res.redirect("/events");
    }
    catch(e){
        res.render("error", { signedIn: true, pageTitle: "Error", errorStatus: "500", errorMsg: e });

    }
    
  });

router
  .route("/updateEvent")
  .get(async (req, res) => {
    try {
      if (!req.session.user) {
        res.redirect("/signin");
        return;
        //return res.status(401).send('You must be logged in to view this page.')
      }
      
      let ownerID = req.session.user.userId;
      let eventList
      try{
        eventList = await getEventsByOwnerId(ownerID)
      }
      catch(e){
        return res.status(404).render("error", {signedIn: true, pageTitle: "Error", errorStatus: "404", errorMsg: "Owner's Events not found"})
      }
      if (!eventList){
        return res.status(404).render("error", { signedIn: true, pageTitle: "Error", errorStatus: "404", errorMsg: "Owner's Events not found" });
    }
      let signedIn = req.session.user ? true : false;
      res.render("updateEvent", {
        pageTitle: "Update Event",
        userId: req.session.user.userId,
        events: eventList,
        signedIn: signedIn
      });
    } catch (e) {
        return res.status(500).render("error", {signedIn: true, pageTitle: "Error", errorStatus: "500", errorMsg: e});
    }
  })
  .post(async (req, res) => {
    try{
        let ownerID = req.session.user.userId;
        let eventList
        try{
            eventList = await getEventsByOwnerId(ownerID);
        }
        catch(e){
            return res.status(404).render("error", {signedIn: true, pageTitle: "Error", errorStatus: "404", errorMsg: "Owner's Events not found"})
        }
        if (!eventList){
            return res.status(404).render("error", { signedIn: true, pageTitle: "Error", errorStatus: "404", errorMsg: "Owner's Events not found" });
        }
        
        let signedIn = req.session.user ? true : false;
        res.render("eventForm", {
          pageTitle: "Update Event Form",
          userId: req.session.user.userId,
          events: eventList,
          eventId: xss(req.body.eventId),
          signedIn: signedIn
        });
    }
    catch(e){
        return res.status(500).render("error", {signedIn: true, pageTitle: "Error", errorStatus: "500", errorMsg: e});
    }
    
  });

router
  .route("/updateEventWithId")
  .get(async (req, res) => {
    try {
      if (!req.session.user) {
        res.redirect("/signin");
        return;
        //return res.status(401).send('You must be logged in to view this page.')
      }
      let ownerID = req.session.user.userId;
      let eventList
      try{
        eventList = await getEventsByOwnerId(ownerID);
      }
      catch(e){
        return res.status(404).render("error", {signedIn: true, pageTitle: "Error", errorStatus: "404", errorMsg: "Owner's Events not found"})
      }
      if (!eventList){
        return res.status(404).render("error", { signedIn: true, pageTitle: "Error", errorStatus: "404", errorMsg: "Owner's Events not found" });
    }
      let signedIn = req.session.user ? true : false;
      res.render("updateEvent", {
        pageTitle: "Update Event",
        userId: req.session.user.userId,
        events: eventList,
        signedIn: signedIn
      });
    } catch (e) {
        return res.status(500).render("error", {signedIn: true, pageTitle: "Error", errorStatus: "500", errorMsg: e});
    }
  })
  .post(async (req, res) => {
    if (!req.session.user) {
      res.redirect("/signin");
      return;
      //return res.status(401).send('You must be logged in to view this page.')
    }
    let { eventId, eventName, email, location, description } = req.body;
    eventId = xss(eventId);
    eventName = xss(eventName);
    email = xss(email);
    description = xss(description);

    // try{
    //     if (!eventId.trim()) throw "EventId was not given"
    //     if (!eventName.trim()) throw "Event name was not given"
    //     if (!email.trim()) throw "Email was not given"
    //     if (!location.trim()) throw "Location was not given"
    //     if (!description.trim()) throw "Description was not given"    
    // }
    // catch(e){
    //     return res.status(400).render("error", {signedIn: true, pageTitle: "Error", errorStatus: "400", errorMsg: e});;
    // }
    
    const updateFields = {};
    let event
    try{
        event = await getEventById(eventId);
    }
    catch(e){
        return res.status(404).render("error", { signedIn: true, pageTitle: "Error", errorStatus: "404", errorMsg: "Event not found" });
    }
    if (!event){
        return res.status(404).render("error", { signedIn: true, pageTitle: "Error", errorStatus: "404", errorMsg: "Event not found" });
    }
    try {
      if (eventName) {
        updateFields.eventName = eventName;
      } else {
        updateFields.eventName = event[0].eventName;
      }
      if (email) {
        updateFields.email = email;
      } else {
        updateFields.email = event[0].email;
      }
      if (location) {
        try{
            location = validation.validateLocation(location)
        }
        catch(e){
            return res.status(400).render("error", { signedIn: true, pageTitle: "Error", errorStatus: "400", errorMsg: "Format has to be 'city, state' for location" });
            
        }
        updateFields.location = location;
      } else {
        updateFields.location = event[0].location;
      }
      if (description) {
        updateFields.description = description;
      } else {
        updateFields.description = event[0].description;
      }
    } catch (e) {
      res.status(400).render("error", {
        errorStatus: "400",
        errorMsg: "There was a problem with the updating the event",
      });
    }

    //console.log(updateFields);
    try {
      let userUpdate = await updateEvent(eventId, updateFields);
      //console.log(userUpdate);
    } catch (e) {
    return res.status(404).render("error", {signedIn: true, pageTitle: "Error", errorStatus: "404", errorMsg: "Owner's Events not found"})
    }

    //let ownerID = req.session.user.userId
    res.redirect("/events");
  });

router
  .route("/deleteEvent")
  .get(async (req, res) => {
    try {
      if (!req.session.user) {
        res.redirect("/signin");
        return;
        // return res.status(401).send('You must be logged in to view this page.')
      }
      let ownerID = req.session.user.userId;
      // try{
      //     const eventList = await getEventsByOwnerId(ownerID)
      // }
      // catch(e){
      //     res.render("error", {errorStatus: 500, errorMsg:e})
      // }
      let eventList
      try{
        eventList = await getEventsByOwnerId(ownerID)
      }
      catch(e){
        return res.status(404).render("error", {signedIn: true, pageTitle: "Error", errorStatus: "404", errorMsg: "Events not found"});;
      }
      if (!eventList){
        return res.status(404).render("error", { signedIn: true, pageTitle: "Error", errorStatus: "404", errorMsg: "Owner's Events not found" });
    }
      let signedIn = req.session.user ? true : false;
    //   console.log(eventList)
      res.render("deleteEvent", {
        pageTitle: "Delete Event",
        userId: req.session.user.userId,
        events: eventList,
        signedIn: signedIn,
      });
    } catch (e) {
        return res.status(500).render("error", {signedIn: true, pageTitle: "Error", errorStatus: "500", errorMsg: e});
    }
  })

  .post(async (req, res) => {
    try{
        let deleted = await deleteEvent(xss(req.body.eventId));
        let ownerID = req.session.user.userId;
        let eventList
        try {
        eventList = await getEventsByOwnerId(ownerID);
        //   console.log(eventList)
        let signedIn = req.session.user ? true : false;
        res.render("deleteEvent", {
            pageTitle: "Delete Event",
            userId: req.session.user.userId,
            events: eventList,
            signedIn: signedIn
        });
        } catch (e) {
        return res.status(404).render("error", { signedIn: true, pageTitle: "Error", errorStatus: "404", errorMsg: "Owner's Events not found" });
        }
        if (!eventList){
            return res.status(404).render("error", { signedIn: true, pageTitle: "Error", errorStatus: "404", errorMsg: "Owner's Events not found" });
        }

    }
    catch(e){
        return res.status(500).render("error", {signedIn: true, pageTitle: "Error", errorStatus: "500", errorMsg: e});
    }
    
    // console.log(eventList)
  });

router
  .route("/eventDetails/:id")
  .get(async (req, res) => {
    try{
        if (!req.session.user) {
            res.redirect("/signin");
            return;
            // return res.status(401).send('You must be logged in to view this page.')
          }
        let ownerID = req.session.user.userId;
        let event
        try{
            event = await getEventById(req.params.id)
        }
        catch(e){
            return res.status(404).render("error", { signedIn: true, pageTitle: "Error", errorStatus: "404", errorMsg: "Owner's Events not found" });
        }
        if (!event){
            return res.status(404).render("error", { signedIn: true, pageTitle: "Error", errorStatus: "404", errorMsg: "Events not found" });
        }
        
        let hasRSVPED = false
        let isOwner = false
        
        if (event[0].rsvpedUsers.includes(ownerID)){
            hasRSVPED = true
        }
        if (event[0].ownerID.toString() === ownerID){
            isOwner = true
        }
        let location = event[0].location
        let RSVEDUsers = event[0].rsvpedUsers
        return res.render('eventDetails', {signedIn: true, pageTitle: "Event Details", eventName: event[0].eventName, eventDescription: event[0].description, contact: event[0].email, eventId: req.params.id, hasRSVPED: hasRSVPED, location: location, isOwner: isOwner, RSVEDUsers: RSVEDUsers})
    }
    catch(e){
        return res.status(500).render("error", { signedIn: true, pageTitle: "Error",  errorStatus: "500", errorMsg: e });
    }
    
  })
router
  .route("/rsvpAdd/:id")
  .get(async (req, res) => {
    try{
        if (!req.session.user) {
            res.redirect("/signin");
            return;
            // return res.status(401).send('You must be logged in to view this page.')
        }
        const eventsCollection = await events()
        let event
        try{
            event = await getEventById(req.params.id)
        }
        catch(e){
            return res.render("error", {signedIn: true, pageTitle: "Error", errorStatus: "404", errorMsg: 'Event not found' });
        }
        const user = req.session.user.userId
        
        if (!event){
            return res.render("error", {signedIn: true, pageTitle: "Error", errorStatus: "404", errorMsg: 'Event not found' });
        }
        if (event[0].rsvpedUsers && event[0].rsvpedUsers.includes(user)) {
            //console.log(event[0])
            res.render("eventDetails", {
              pageTitle: "Event Details",
              message: `You have already RSVP'd to ${event[0].eventName}!`
            });
            return;
        }
        let vpedUsers = event[0].rsvpedUsers
        vpedUsers.push(user)
        const updateUser = await updateEvent(req.params.id, event[0])
        let isOwner = false
        let ownerID = req.session.user.userId;
        if (event[0].ownerID.toString() === ownerID){
            isOwner = true
        }
        let RSVEDUsers = event[0].rsvpedUsers
        res.render("eventDetails", {signedIn: true, pageTitle: "Event Details", message: `You successfuly RSVPd for the ${event[0].eventName}!`, isOwner: isOwner, RSVEDUsers: RSVEDUsers});
        // res.render('eventDetails', {pageTitle: "Event Details", eventName: event[0].eventName, eventDescription: event[0].description, contact: event[0].email, eventId: req.params.id})
    }
    catch(e){
        res.render("error", { signedIn: true, pageTitle: "Error", errorStatus: 500, errorMsg: e });
    }
    
  })

  router
  .route("/rsvpRemove/:id")
  .get(async (req, res) => {
    try{
        if (!req.session.user) {
            res.redirect("/signin");
            return;
            // return res.status(401).send('You must be logged in to view this page.')
        }
        const eventsCollection = await events()
        let event
        try{
            event = await getEventById(req.params.id)
        }
        catch(e){
            return res.status(404).render("error", { signedIn: true, pageTitle: "Error", errorStatus: "404", errorMsg: "Event not found" });
        }
        const user = req.session.user.userId
        
        if (!event){
            res.status(404).render("error", { signedIn: true, pageTitle: "Error", errorStatus: "404", errorMsg: 'Event not found' });
            return
        }
        if (event[0].rsvpedUsers && event[0].rsvpedUsers.includes(user)) {
            let indexOfUser = event[0].rsvpedUsers.indexOf(user)
            if (indexOfUser > -1){
                event[0].rsvpedUsers.splice(indexOfUser, 1)
            }
        }
        const updateUser = await updateEvent(req.params.id, event[0])
        
        res.render("eventDetails", {signedIn: true, pageTitle: "Event Details", message: `You successfuly removed your RSVP for the ${event[0].eventName}!`});
        // res.render('eventDetails', {pageTitle: "Event Details", eventName: event[0].eventName, eventDescription: event[0].description, contact: event[0].email, eventId: req.params.id})
    }
    catch(e){
        return res.status(500).render("error", { signedIn: true, pageTitle: "Error", errorStatus: "500", errorMsg: e });
    }
    
  })

export default router;
