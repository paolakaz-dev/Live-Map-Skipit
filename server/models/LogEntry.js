const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const LogEntrySchema = new Schema({

  title: {
    type: String,
    required: true
  },
  comment: {
    type: String,
  },
  image: {
    type:String,
  },
  latitude: {
    type: Number,
    required: true,
    min: -90,
    max: 90,
  },
  longitude: {
    type: Number,
    required: true,
    min: -180,
    max: 180,
  },
  userFrom: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  category: {
    type: String,
    required: true,

  }
}, {
    timestamps:true,
});

module.exports = LogEntry = mongoose.model("LogEntries", LogEntrySchema);


