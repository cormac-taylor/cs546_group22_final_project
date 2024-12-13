// I need to add a new colection for event information

import { events } from "../config/mongoCollections.js"
import { validateEmail, validateGeoJson, validateObjectID, validateString } from "../utilities/validation.js"

export const addEvent = async (
    ownerID,
    eventName, 
    email, 
    location,
    description,
    startDate,
    endDate
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
        description,
        startDate,
        endDate
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
    id
) => {

    id = validateObjectID(id)

    const eventsCollection = await events()
    const deleteEvent = eventsCollection.findOneAndDelete({_id: id})
    if (!deleteEvent) throw `There was an error deleting this event: ${id}`

}

export const getEventsByOwnerId = async (
    ownerID
) => {
    ownerID = validateString(ownerID)
    const eventsCollection = await events()
    const eventList = await eventsCollection.find({ ownerID: ownerID }).toArray()
    return eventList
}

