import { Router } from "express";
const router = Router();
import {} from "../utilities/validation.js";

// Main page for people to see events
router.route("/").get(async (req, res) => {
    // Anyone can see this so no check for cookies
    console.log("let me see events")
    try {
        res.render("events", { pageTitle: "Local Events" })
        
    } catch (e) {
        res.status(500).json({ error: e })
    }
});

// router.route("/createEvent").post(async (req, res) =>

// )
export default router;
