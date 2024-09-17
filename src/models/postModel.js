const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  title: String,
  message: String,
  name: String,
  creator: { type: mongoose.Types.ObjectId, ref: "User" },
  tags: [String],
  selectedFile: String,
  likes: {
    type: [{ type: mongoose.Types.ObjectId, ref: "User" }],
    default: [],
  },
  comments: {
    type: [
      {
        userId: {
          type: mongoose.Types.ObjectId,
          ref: "User",
        },
        comment: String,
        _id: false,
      },
    ],
    default: [],
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const PostModel = mongoose.model("PostMessage", postSchema);

module.exports = PostModel;
