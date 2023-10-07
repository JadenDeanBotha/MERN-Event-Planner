const express = require("express");

const router = express.Router();

//These are the controllers for user login and user signUp
const { signUpUser, logInUser } = require("../controllers/UserControllers");

//These are the middleware functions
const { adminCheck } = require("../Middleware/AdminCheck");
const { JWTTest } = require("../Middleware/JWTCheck");
const { checkEmail } = require("../Middleware/EmailCheck");

//These are the controllers for the events
const {
  addEvent,
  deleteEvent,
  getEvents,
  updateEvent,
} = require("../controllers/EventController");

//These are the endpoints going to be used by the server.js file
router.post("/createUser", checkEmail, signUpUser);
router.post("/LogInUser", logInUser);
router.post("/createEvent", addEvent);
router.delete("/delete/:id", deleteEvent);
router.get("/events", getEvents);
router.put("/editEvent/:id", JWTTest, updateEvent);

module.exports = router;
