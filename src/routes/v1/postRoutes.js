const express = require("express");
const {
  getPosts,
  createPost,
  getSinglePost,
  updatePost,
  deletePost,
} = require("../../controllers/postController");

const router = express.Router();

router.route("/").get(getPosts).post(createPost);

router.route("/:id").get(getSinglePost).patch(updatePost).delete(deletePost);

module.exports = router;
