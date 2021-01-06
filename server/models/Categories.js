const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const CategorySchema = new Schema({
  // _id: Schema.Types.ObjectId,
    category: {
    type: String,
    required: true
  }
});

module.exports = Category = mongoose.model("categories", CategorySchema);
