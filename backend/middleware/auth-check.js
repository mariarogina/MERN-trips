const jwt = require("jsonwebtoken");
const HttpError = require("../models/http-error");
// autentikointi ja autorisointikoodit
module.exports = (req, res, next) => {
  // console.log("method" + req.method);
  if (req.method === "OPTIONS") {
    return next();
  }
  try {
    // auth: Bearer token
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      throw new Error("Authentication failed");
    }
    // puretaan token ja jatketaan seuraavaan mw-funktioon
    const decodedToken = jwt.verify(token, "secretKey");
    req.userData = {
      // _id: decodedToken._id,
      sähköpostiosoite: decodedToken.sähköpostiosoite,
    };
    next();
  } catch (err) {
    const error = new HttpError("Authentication failed", 401);
    return next(error);
  }
};
