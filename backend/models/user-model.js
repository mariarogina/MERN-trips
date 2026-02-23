const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = new Schema({
  nimi: { type: String, required: true },
  paikkakunta: { type: String, required: true },
  sähköpostiosoite: { type: String, required: true, unique: true },
  salasana: { type: String, required: true, minlength: 3 },
  syntymävuosi: { type: String, required: true },
  valokuvanNimi: { type: String, required: true },
});

userSchema.plugin(uniqueValidator);
module.exports = mongoose.model("User", userSchema, "Users");
