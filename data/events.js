// I need to add a new colection for event information

import { events } from "../config/mongoCollections.js"
import { validateEmail, validateGeoJson, validateString } from "../utilities/validation.js"

export const addEvent = async (
    ownerID,
    eventName, 
    email, 
    location,
    description
) => {
    // console.log("yo")
    eventName = validateString(eventName)
    email = validateEmail(email)
    //location = validateGeoJson(location)

    const newEvent = {
        ownerID,
        eventName,
        email,
        location,
        description
    }
    // console.log(newEvent)
    const eventsCollection = await events()
    const insertEvent = await eventsCollection.insertOne(newEvent)
    
    if (!insertEvent.acknowledged || !insertEvent.insertedId)
        throw "could not add event.";

    return insertEvent
}
export const updateEvent = async (
    // I need the Event Id here
) => {

}
export const deleteEvent = async (
    
) => {

}

export const findAllEvents = async (
    ownerID
) => {
    ownerID = validateString(ownerID)
    const eventsCollection = await events()
    const eventList = await eventsCollection.find({ ownerID: ownerID }).toArray()
    return eventList
}

