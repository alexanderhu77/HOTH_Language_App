const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  fileName: {
    type: String,
    required: true,
  },
  audioURL: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  comments: [
    {
      content: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  language: {
    type: String,
    required: true,
    enum: ["English", "French", "Pidgin"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

postSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

// Fix: Export the model correctly
module.exports = mongoose.model("Post", postSchema);
