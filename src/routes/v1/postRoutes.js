const express = require("express");
const {
  getPosts,
  createPost,
  getSinglePost,
  updatePost,
  deletePost,
  likePost,
  commentPost,
} = require("../../controllers/postController");
const auth = require("../../middlewares/auth");

const router = express.Router();

// req.userId we set in the middleware of the auth file.

router.route("/").get(getPosts).post([auth, createPost]);

router
  .route("/:id")
  .get(getSinglePost)
  .patch(auth, updatePost)
  .delete(auth, deletePost);

router.patch("/:id/likePost", auth, likePost);

router.post("/:id/commentPost", auth, commentPost);

module.exports = router;
