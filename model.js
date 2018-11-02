const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const noteSchema = new Schema({
  title: String,
  text: String
});

const model = mongoose.model("Notes", noteSchema);
module.exports = model;
