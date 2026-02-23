const express = require("express");
const HttpError = require("../models/http-error");
const usersControllers = require("../controllers/users-controllers");

// luodaan tänne reititys users resurssille

const router = express.Router();

router.get("/", usersControllers.getAllUsers);

router.get("/:id", usersControllers.getUserById);

router.post("/", usersControllers.signup);

router.post("/login/", usersControllers.login);

//get user by mail
router.get("/search/:mail", usersControllers.getUserByMail);

module.exports = router;
