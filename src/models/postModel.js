const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  title: String,
  message: String,
  name: String,
  creator: { type: mongoose.Types.ObjectId, ref: "User" },
  tags: [String],
  selectedFile: String,
  likes: {
    type: [String],
    default: [],
  },
  comments: {
    type: [String],
    default: [],
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const PostModel = mongoose.model("PostMessage", postSchema);

module.exports = PostModel;
