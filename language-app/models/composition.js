const mongoose = require("mongoose");

const url = process.env.MONGODB_URI;

const compositionSchema = new mongoose.Schema({
  name: String,
  content: String,
  language: String,
});

compositionSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = new mongoose.model("Composition", compositionSchema);
