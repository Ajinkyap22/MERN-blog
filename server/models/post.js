const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, required: true },
  comments: { type: Array },
  published: { type: Boolean },
  timestamp: { type: Date },
});

module.exports = mongoose.model("Post", PostSchema);
