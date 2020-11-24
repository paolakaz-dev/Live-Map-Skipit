const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const LogEntrySchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
  },
  comment: {
    type: String,
  },
  rating: {
    type: Number,
    min: 0,
    max: 10,
    default: 0,
  },
  image: {
    type: String,
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
  comments: {
    type: String,
  }
 
}, {
    timestamps:true,
}

);

module.exports = LogEntry = mongoose.model("LogEntries", LogEntrySchema);
