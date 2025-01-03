import { Router } from "express";
import { addMessage, getChatHistory } from "../data/chatroom.js";
import { getUserById } from "../data/users.js";
import { chatroomMessages } from "../config/mongoCollections.js";
import xss from "xss";
const router = Router();

//Get XSS involved here

router.route("/").get(async (req, res) => {
    let ownerID = req.session.user.userId;
    let user
    try {
        user = await getUserById(ownerID)
    }
    catch(e){
        return res.status(404).render("error", { signedIn: true, pageTitle: "Error", errorStatus: "404", errorMsg: "User not found" });
    }
    if (!user){
        return res.status(404).render("error", { signedIn: true, pageTitle: "Error", errorStatus: "404", errorMsg: "User not found" });
    }
    let username = user.username

    const chatroomHistory = await chatroomMessages()
    // Get all the charmessages somehow and send that array into the page
    const chatHistory = await getChatHistory()
    if (chatHistory){
        res.render("chatroom", {signedIn: true, pageTitle: "Chatroom", username: username, messages: chatHistory})
    }
    else{
        res.render("chatroom", {signedIn: true, pageTitle: "Chatroom", username: username})
    }
    // res.render("chatroom", {pageTitle: "Chatroom", username: username})
})
.post(async (req, res) => {

})
router.route("/sendMessage").get(async (req, res) => {
    try{
        if (!req.session.user) {
            res.redirect("/signin");
            return;
            // return res.status(401).send('You must be logged in to view this page.')
          }
        let ownerID = req.session.user.userId;
        let user
        try {
            user = await getUserById(ownerID)
        }
        catch(e){
            return res.status(404).render("error", { signedIn: true, pageTitle: "Error", errorStatus: "404", errorMsg: "User not found" });
        }
        if (!user){
            return res.status(404).render("error", { signedIn: true, pageTitle: "Error", errorStatus: "404", errorMsg: "User not found" });
        }
        let username = user.username
        const chatHistory = await getChatHistory()
        if (chatHistory){
            return res.render("chatroom", {signedIn: true, pageTitle: "Chatroom", username: username, messages: chatHistory})
        }
        else{
            return res.render("chatroom", {signedIn: true, pageTitle: "Chatroom", username: username})
        }
        // res.render("chatroom", {pageTitle: "Chatroom", username: username})
    }
    catch(e){
        return res.render("error", { signedIn: true, pageTitle: "Error", errorStatus: "500", errorMsg: e });
    }
    

})
.post(async (req, res) => {
    try{
        if (!req.session.user) {
            res.redirect("/signin");
            return;
            // return res.status(401).send('You must be logged in to view this page.')
          }
        const messageDetails = req.body;
        if (!xss(messageDetails.message).trim()) throw "Message was empty!"
        messageDetails.message = xss(messageDetails.message)
        let ownerID = req.session.user.userId;
        let user
        try {
            user = await getUserById(ownerID)
        }
        catch(e){
            return res.status(404).render("error", { signedIn: true, pageTitle: "Error", errorStatus: "404", errorMsg: "User not found" });
        }
        if (!user){
            return res.status(404).render("error", { signedIn: true, pageTitle: "Error", errorStatus: "404", errorMsg: "User not found" });
        }
        let username = user.username
        // res.render("chatroom", {pageTitle: "Chatroom", username: username})
        const today = new Date().toGMTString();
        let addMess = await addMessage(ownerID, username, messageDetails.message, today)
        const chatHistory = await getChatHistory()
        if (chatHistory){
            return res.render("chatroom", {signedIn: true, pageTitle: "Chatroom", username: username, messages: chatHistory})
        }
        else{
            return res.render("chatroom", {signedIn: true, pageTitle: "Chatroom", username: username})
        }
        //console.log(chatHistory)
    }
    catch(e){
        return res.status(400).render("error", { signedIn: true, pageTitle: "Error", errorStatus: "400", errorMsg: e });
    }
    

})

export default router;
