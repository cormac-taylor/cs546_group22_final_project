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
    const eventsCollection = await events();
    const allEvents = await eventsCollection.find({}).toArray();
    const formattedEvents = allEvents.map((event) => ({
      title: event.eventName,
      start: event.Date,
    //   end: event.endDate || null,
      description: event.description || "",
      id: event._id,
      email: event.email
    }));
    let signedIn = req.session.user ? true : false;
    res.render("events", {
      pageTitle: "Local Events",
      events: JSON.stringify(formattedEvents),
      signedIn: signedIn
    });
  } catch (e) {
    return res.status(500).render("error", {signedIn: true, pageTitle: "Error", errorStatus: "500", errorMsg: "500 Server Error"});;
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
        res.render("createEvent", { pageTitle: "Create Event", signedIn: signedIn });
      }
    } catch (e) {
      res.status(500).json({ error: e });
    }
  })
  .post(async (req, res) => {
    try{
        const createEventFormInfo = req.body;
        let errors = [];
        if (!req.session.user) {
          res.redirect("/signin");
          return;
          // return res.status(401).send('You must be logged in to view this page.')
        }
        let ownerID = req.session.user.userId;
        let owner = await getUserById(ownerID)
        // try {
        //   createEventFormInfo.username = validation.validateUsername(
        //     xss(createEventFormInfo.username)
        //   );
        // } catch (e) {
        //   errors.push(`Username ${e}`);
        // }
    
        // try {
        //   createEventFormInfo.email = validation.validateEmail(
        //     xss(createEventFormInfo.email)
        //   );
        // } catch (e) {
        //   errors.push(`Email ${e}`);
        // }
        // try{
        //     createEventFormInfo.location = validation.validateGeoJson(createEventFormInfo.location)
        // }
        // catch(e){
        //     errors.push(`Location ${e}`)
        // }
        //console.log("yo")
        if (!createEventFormInfo.eventName) throw "No event name given"
        if (!createEventFormInfo.location) throw "No location given"
        if (!createEventFormInfo.description) throw "No description given"
        try {
          createEventFormInfo.description = validation.validateString(
            xss(createEventFormInfo.description)
          );
        } catch (e) {
          errors.push(`Description ${e}`);
        }
    
        const today = new Date()
        const formattedToday = today.toISOString().split('T')[0];
        // console.log(formattedToday)
        // console.log(createEventFormInfo.Date)
        if (formattedToday > createEventFormInfo.Date){
            res.render("error", { errorStatus: 500, errorMsg: "You cannot create an Event for the past" });
            return
        }
        let result = await addEvent(
          ownerID,
          owner.username,
          xss(createEventFormInfo.eventName),
          owner.email,
          createEventFormInfo.location,
          createEventFormInfo.description,
          xss(createEventFormInfo.Date)
        );
        // let user = await getUserById(ownerID)
        // user.eventsCreated.push(result.insertedId.toString())
        // console.log(user)
        // let updatecurrUser = await updateUser(ownerID, {eventsCreated: user.eventsCreated})
        res.redirect("/events");
    }
    catch(e){
        res.render("error", { errorStatus: 500, errorMsg: e });

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
      const eventList = await getEventsByOwnerId(ownerID);
      let signedIn = req.session.user ? true : false;
      res.render("updateEvent", {
        pageTitle: "Update Event",
        userId: req.session.user.userId,
        events: eventList,
        signedIn: signedIn
      });
    } catch (e) {
      res.render("error", { errorStatus: 500, errorMsg: e });
    }
  })
  .post(async (req, res) => {
    let ownerID = req.session.user.userId;
    const eventList = await getEventsByOwnerId(ownerID);
    let signedIn = req.session.user ? true : false;
    res.render("eventForm", {
      pageTitle: "Update Event Form",
      userId: req.session.user.userId,
      events: eventList,
      eventId: xss(req.body.eventId),
      signedIn: signedIn
    });
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
      const eventList = await getEventsByOwnerId(ownerID);
      let signedIn = req.session.user ? true : false;
      res.render("updateEvent", {
        pageTitle: "Update Event",
        userId: req.session.user.userId,
        events: eventList,
        signedIn: signedIn
      });
    } catch (e) {
      res.render("error", { errorStatus: 500, errorMsg: e });
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

    const updateFields = {};
    let event = await getEventById(eventId);
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
      res.render("error", {
        errorStatus: 500,
        errorMsg: "There was a problem with the updating the event",
      });
    }

    console.log(updateFields);
    try {
      let userUpdate = await updateEvent(eventId, updateFields);
      console.log(userUpdate);
    } catch (e) {
      res.render("error", { errorStatus: 500, errorMsg: e });
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
      const eventList = await getEventsByOwnerId(ownerID);
      let signedIn = req.session.user ? true : false;
      // console.log(eventList)
      res.render("deleteEvent", {
        pageTitle: "Delete Event",
        userId: req.session.user.userId,
        events: eventList,
        signedIn: signedIn,
      });
    } catch (e) {
      res.status(500).json({ error: e });
    }
  })

  .post(async (req, res) => {
    let deleted = await deleteEvent(xss(req.body.eventId));

    let ownerID = req.session.user.userId;
    try {
      const eventList = await getEventsByOwnerId(ownerID);
      let signedIn = req.session.user ? true : false;
      res.render("deleteEvent", {
        pageTitle: "Delete Event",
        userId: req.session.user.userId,
        events: eventList,
        signedIn: signedIn
      });
    } catch (e) {
      res.render("error", { errorStatus: 500, errorMsg: e });
    }
    // console.log(eventList)
  });

router
  .route("/eventDetails")
  .get(async (req, res) => {
    try{
        console.log("yo")
        const eventCollection = await events()
        const event = await getEventById(req.params.id)
    
        if (!event){
            res.render("error", { errorStatus: 404, errorMsg: 'Event not found' });
            return
        }
        res.render('eventDetails', {pageTitle: "Event Details", eventName: event.name, eventDescripton: event.description, contact: event.email})
    }
    catch(e){
        res.render("error", { errorStatus: 500, errorMsg: e });
    }
    
  })
export default router;
