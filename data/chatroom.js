import { chatroomMessages } from "../config/mongoCollections.js"
import { validateEmail, validateGeoJson, validateObjectID, validateString } from "../utilities/validation.js"


export const addMessage = async (
    ownerID,
    username,
    message,
    dateCreated
) => {

    if (!ownerID) throw "OwnerId was not given"
    if (!message) throw "Message was not given"

    ownerID = validateObjectID(ownerID)
    message = validateString(message)
    // ownerID = ownerID.trim()
    message = message.trim()

    const messageDetails = {
        ownerID,
        username,
        message,
        dateCreated
    }
    const chatroom = await chatroomMessages()

    const insertMessage = await chatroom.insertOne(messageDetails)

    if (!insertMessage.acknowledged || !insertMessage.insertedId)
        throw "could not add event.";

    return insertMessage
}

export const getChatHistory = async () => {
    const chatroom = await chatroomMessages()
    const chatroomCollection = await chatroomMessages(); // Connect to the collection
    const chatHistory = await chatroomCollection.find({}).sort({ dateCreated: 1 }).toArray();
    return chatHistory;
}

