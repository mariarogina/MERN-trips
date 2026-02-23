const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const storySchema = new Schema({
  tekijänNimi: { type: String, required: true },
  paikkakunta: { type: String, required: true },
  pvm: { type: Date, required: true },
  kohde: { type: String, required: true },
  tarina: { type: String, required: true },
  kuva: { type: String, required: true },
  //here below goes reference to user (most likely)
  tekijänId: { type: String, required: true },
});

module.exports = mongoose.model("Story", storySchema, "stories");
