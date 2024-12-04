// I need to add a new colection for event information

import { events } from "../config/mongoCollections.js"
import { validateEmail, validateGeoJson, validateString } from "../utilities/validation.js"

export const addEvent = async (
    eventName, 
    email, 
    location,
    description
) => {
    console.log("yo")
    eventName = validateString(eventName)
    email = validateEmail(email)
    //location = validateGeoJson(location)

    const newEvent = {
        eventName,
        email,
        location,
        description
    }
    console.log(newEvent)
    const eventsCollection = await events()
    const insertEvent = await eventsCollection.insertOne(newEvent)

    if (!insertEvent.acknowledged || !insertEvent.insertedId)
        throw "could not add game.";


}
export const updateEvent = async (
    // I need the Event Id here
) => {

}
export const deleteEvent = async (
    // I need the Event Id here
) => {

}

