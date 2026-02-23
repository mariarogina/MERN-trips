const express = require("express");
const HttpError = require("../models/http-error");
const storiesControllers = require("../controllers/stories-controllers");
const checkAuth = require("../middleware/auth-check");
// luodaan tänne reititys stories resurssille

const router = express.Router();

//no token validation required
router.get("/", storiesControllers.getAllStories);
router.get("/:id", storiesControllers.getStoryById);
router.get("/user/:name", storiesControllers.getStoriesByUser);

//token validation required
//middleware

router.use(checkAuth);
router.post("/", storiesControllers.createStory);
router.delete("/:id", storiesControllers.deleteStoryById);
router.patch("/:id", storiesControllers.updateStoryById);

module.exports = router;
