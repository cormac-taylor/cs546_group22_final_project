import { Router } from "express";
const router = Router();
import * as validation from "../utilities/validation.js";
import { addEvent, findAllEvents } from "../data/events.js";
import xss from "xss"

// Main page for people to see events
router.route("/").get(async (req, res) => {
  // Anyone can see this so no check for cookies
  //console.log("let me see events")
  try {
    res.render("events", { pageTitle: "Local Events" });
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

// You have to add the post thing here
router
  .route("/createEvent")
  .get(async (req, res) => {
    // Anyone can see this so no check for cookies
    //console.log("let me see events")
    try {
      if (!xss(session.user)) {
        return res.status(401).send("You must be logged in to view this page.");
      }
      let ownerID = xss(session.user.userId);
      res.render("createEvent", { pageTitle: "Create Event" });
    } catch (e) {
      res.status(500).json({ error: e });
    }
  })
  .post(async (req, res) => {
    const createEventFormInfo = body;
    let errors = [];
    if (!req.session.user) {
      return res.status(401).send("You must be logged in to view this page.");
    }
    let ownerID = req.session.user.userId;
    try {
      createEventFormInfo.username = validation.validateUsername(
        xss(createEventFormInfo.username)
      );
    } catch (e) {
      errors.push(`Username ${e}`);
    }

    try {
      createEventFormInfo.email = validation.validateEmail(
        xss(createEventFormInfo.email)
      );
    } catch (e) {
      errors.push(`Email ${e}`);
    }
    // try{
    //     createEventFormInfo.location = validation.validateGeoJson(xss(createEventFormInfo.location))
    // }
    // catch(e){
    //     errors.push(`Location ${e}`)
    // }
    //console.log("yo")
    try {
      createEventFormInfo.description = validation.validateString(
        xss(createEventFormInfo.description)
      );
    } catch (e) {
      errors.push(`Description ${e}`);
    }
    let result = await addEvent(
      ownerID,
      createEventFormInfo.username,
      createEventFormInfo.email,
      createEventFormInfo.location,
      createEventFormInfo.description
    );
    // const eventId = result.insertedId
    // I can do something like the above but idk how to make the button delete that specific item
    res.render("events", { pageTitle: "Local Events" });
  });

router
  .route("/updateEvent")
  .get(async (req, res) => {
    try {
      if (!req.session.user) {
        return res.status(401).send("You must be logged in to view this page.");
      }
      let ownerID = req.session.user.userId;
      const eventList = await findAllEvents(ownerID);
      res.render("updateEvent", {
        pageTitle: "Update Event",
        userId: req.session.user.userId,
        events: eventList,
      });
    } catch (e) {
      res.status(500).json({ error: e });
    }
  })
  .patch(async (req, res) => {
    const eventName = xss(req.body.eventName);
    const email = xss(req.body.email);
    const location = req.body.location;
    const description = xss(req.body.description);

    const updateFields = {};
    if (eventName) {
      updateFields.eventName = eventName;
    }
    if (email) {
      updateFields.email = email;
    }
    if (location) {
      updateFields.location = location;
    }
    if (description) {
      updateFields.description = description;
    }
  });

router
  .route("/deleteEvent")
  .get(async (req, res) => {
    try {
      if (!req.session.user) {
        return res.status(401).send("You must be logged in to view this page.");
      }
      let ownerID = req.session.user.userId;
      const eventList = await findAllEvents(ownerID);
      // console.log(eventList)
      res.render("deleteEvent", {
        pageTitle: "Delete Event",
        userId: req.session.user.userId,
        events: eventList,
      });
    } catch (e) {
      res.status(500).json({ error: e });
    }
  })

  .delete(async (req, res) => {});
export default router;
