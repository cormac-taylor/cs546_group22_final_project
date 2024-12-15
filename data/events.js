// I need to add a new colection for event information

import { ObjectId } from "mongodb"
import { events } from "../config/mongoCollections.js"
import { validateEmail, validateGeoJson, validateObjectID, validateString } from "../utilities/validation.js"

export const addEvent = async (
    ownerID,
    ownerUsername,
    eventName, 
    email, 
    location,
    description,
    Date,
) => {
    // console.log("yo")
    if (!eventName) throw "No event name given"
    if (!location) throw "No location given"
    if (!description) throw "No description given"
    if (!ownerID) throw "No owner ID given"
    if (!ownerUsername) throw "No owner username given"
    if (!email) throw "No email given"
    if (!Date) throw "No event date given"

    ownerUsername = validateString(ownerUsername)
    eventName = validateString(eventName)
    email = validateEmail(email)
    //location = validateGeoJson(location)
    eventName = validateString(eventName)
    email = validateEmail(email)
    

    const newEvent = {
        ownerID,
        ownerUsername,
        eventName,
        email,
        location,
        description,
        Date,
    }
    // console.log(newEvent)

    const eventsCollection = await events()
    const insertEvent = await eventsCollection.insertOne(newEvent)
    if (!insertEvent.acknowledged || !insertEvent.insertedId)
        throw "could not add event.";

    return insertEvent
}
export const updateEvent = async (
    eventId,
    updateEventObject
    // I need the Event Id here
) => {
    eventId = validateObjectID(eventId)
    const eventsCollection = await events()

    if (!updateEventObject) throw "The update event object is empty"

    const updateUser = await eventsCollection.findOneAndUpdate(
        {_id: eventId},
        {$set: {...updateEventObject}},
        {returnDocument: 'after'}
    )
    return updateUser
}
export const deleteEvent = async (
    eventId
) => {

    eventId = validateObjectID(eventId)

    const eventsCollection = await events()
    const deleteEvent = eventsCollection.findOneAndDelete({_id: eventId})
    if (!deleteEvent) throw `There was an error deleting this event: ${eventId}`

}

export const getEventsByOwnerId = async (
    ownerID
) => {
    ownerID = validateString(ownerID)
    const eventsCollection = await events()
    const eventList = await eventsCollection.find({ ownerID: ownerID }).toArray()
    return eventList
}

export const getEventById = async (
    eventId
) => {
    eventId = validateObjectID(eventId)
    const eventsCollection = await events()
    const eventList = await eventsCollection.find({ _id: eventId }).toArray()
    return eventList
}

