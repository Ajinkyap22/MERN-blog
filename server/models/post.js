const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { DateTime } = require("luxon");

const PostSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, required: true, ref: "User" },
  comments: [{ type: Array, default: [] }],
  published: { type: Boolean },
  timestamp: { type: Date },
});

module.exports = mongoose.model("Post", PostSchema);
