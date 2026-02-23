const HttpError = require("../models/http-error");
const User = require("../models/user-model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const getAllUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find();
  } catch (err) {
    const error = new HttpError(
      "Something wrong here, cannot fetch users",
      500,
    );
    return next(error);
  }
  if (!users || users.length == 0) {
    const error = new HttpError("Could not find users", 404);
    return next(error);
  }
  res.json(users);
};

//get by id from mongo atlas
const getUserById = async (req, res, next) => {
  const userId = req.params.id;
  let user;

  // Mongoose kuitenkin sallii tamankin suorittamisen asyncina
  try {
    user = await User.findById(userId);
  } catch (err) {
    console.info(err);
    // taalla on jarjestelman tuottamat virheet
    const error = new HttpError(
      "something wrong here, cannot find a user",
      500,
    );
    return next(error);
  }

  // tassa kasitellaan tilane jossa tieto ei loydy kannasta
  if (!user) {
    const error = new HttpError("Could not find an order by given id", 404);
    return next(error);
  }
  /*
  res.json({user});
  Muunnetaan json javascript objektiksi, jotta sita on suorempi kasitella clientissa, poistetaan myos mongodb:n _id:sta alaviiva eli saadaan id-kentta */
  res.json({ user: user.toObject() });
};

//create user to Atlas
const createUser = async (req, res, next) => {
  const {
    nimi,
    paikkakunta,
    sähköpostiosoite,
    salasana,
    syntymävuosi,
    valokuvanNimi,
  } = req.body;
  const createdUser = new User({
    nimi,
    paikkakunta,
    sähköpostiosoite,
    salasana,
    syntymävuosi,
    valokuvanNimi,
  });
  try {
    await createdUser.save();
  } catch (err) {
    const error = new HttpError("Creating user failed, please try again!", 500);
    return next(error);
  }
  res.status(201).json(createdUser);
};

const signup = async (req, res, next) => {
  // const errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //   return next(new HttpError("Invalid inputs passed, check your data", 422));
  // }
  const {
    nimi,
    paikkakunta,
    sähköpostiosoite,
    salasana,
    syntymävuosi,
    valokuvanNimi,
  } = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ sähköpostiosoite: sähköpostiosoite });
  } catch (err) {
    const error = new HttpError("Signing up failed, try again", 500);
    return next(error);
  }
  if (existingUser) {
    const error = new HttpError(
      "User with that email or uid already exist, login instead.",
      422,
    );
    return next(error);
  }

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(salasana, 12);
    console.log(hashedPassword);
  } catch (err) {
    const error = new HttpError("Could not create user, try again!", 500);
    return next(error);
  }

  const createdUser = new User({
    nimi,
    paikkakunta,
    sähköpostiosoite,
    salasana: hashedPassword,
    syntymävuosi,
    valokuvanNimi,
  });
  try {
    await createdUser.save();
  } catch (err) {
    const error = new HttpError("Creating user failed" + err, 500);
    return next(error);
  }

  //user is created and already in db
  let token;
  try {
    token = jwt.sign(
      {
        //  _id: createdUser._id,
        sähköpostiosoite: createdUser.sähköpostiosoite,
      },
      "secretKey",
      {
        expiresIn: "1h",
      },
    );
  } catch {
    const error = new HttpError("Signing up user failed" + err, 500);
    return next(error);
  }

  console.log(token, "SIGNUP token");
  res.status(201).json({
    token: token,
    // _id: createdUser._id,
    sähköpostiosoite: createdUser.sähköpostiosoite,
  });
};

//login
const login = async (req, res, next) => {
  const { sähköpostiosoite, salasana } = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ sähköpostiosoite: sähköpostiosoite });
  } catch (err) {
    res.status(422).send({ message: "email/password mismatch" });
    const error = new HttpError("login failed, try again", 500);
    return next(error);
  }
  if (!existingUser) {
    console.log("err");
    const error = new HttpError(
      "User id and password dont match. Try again.",
      422,
    );
    return next(error);
  }
  //check if hashed password matches the db password
  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(salasana, existingUser.salasana);
  } catch (err) {
    const error = new HttpError("Invalid credentials, cannot log in", 401);
    return next(error);
  }

  if (!isValidPassword) {
    const error = new HttpError("Invalid credentials, cannot log in", 500);
    return next(error);
  }

  let token;
  try {
    token = jwt.sign(
      {
        //  _id: existingUser._id,
        sähköpostiosoite: existingUser.sähköpostiosoite,
      },
      "secretKey",
      {
        expiresIn: "1h",
      },
    );
  } catch {
    const error = new HttpError("Logging in user failed" + err, 500);
    return next(error);
  }
  res.status(201).json({
    token: token,
    // _id: existingUser._id,
    sähköpostiosoite: existingUser.sähköpostiosoite,
  });

  console.log("Loggedin");
};

//get by id from mongo atlas
const getUserByMail = async (req, res, next) => {
  const userMail = req.params.mail;
  let user;
  // Mongoose kuitenkin sallii tamankin suorittamisen asyncina
  try {
    user = await User.find({ sähköpostiosoite: userMail });
  } catch (err) {
    console.info(err);
    // taalla on jarjestelman tuottamat virheet
    const error = new HttpError(
      "something wrong here, cannot find a user",
      500,
    );
    return next(error);
  }

  // tassa kasitellaan tilane jossa tieto ei loydy kannasta
  if (!user) {
    const error = new HttpError("Could not find a user by given email", 404);
    return next(error);
  }
  /*
  res.json({user});
  Muunnetaan json javascript objektiksi, jotta sita on suorempi kasitella clientissa, poistetaan myos mongodb:n _id:sta alaviiva eli saadaan id-kentta */
  res.json({ user });
};

exports.getAllUsers = getAllUsers;
exports.getUserById = getUserById;
exports.createUser = createUser;
exports.signup = signup;
exports.login = login;
//new route
exports.getUserByMail = getUserByMail;
