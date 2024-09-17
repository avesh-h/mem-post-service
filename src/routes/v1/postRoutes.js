const express = require("express");
const {
  getPosts,
  createPost,
  getSinglePost,
  updatePost,
  deletePost,
} = require("../../controllers/postController");
const auth = require("../../middlewares/auth");

const router = express.Router();

router.route("/").get(getPosts).post([auth, createPost]);

router
  .route("/:id")
  .get(getSinglePost)
  .patch(auth, updatePost)
  .delete(auth, deletePost);

module.exports = router;
