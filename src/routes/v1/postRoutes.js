const express = require("express");
const {
  getPosts,
  getSinglePost,
  createPost,
  updatePost,
  deletePost,
  likePost,
  commentPost,
} = require("../../controllers/postController");
const auth = require("../../middlewares/auth");

const router = express.Router();

// req.userId we set in the middleware of the auth file.

module.exports = (channel) => {
  router
    .route("/")
    .get(getPosts)
    .post(auth, (req, res) => createPost(req, res, channel));

  router
    .route("/:id")
    .get(getSinglePost)
    .patch(auth, updatePost)
    .delete(auth, deletePost);

  router.patch("/:id/likePost", auth, (req, res) =>
    likePost(req, res, channel)
  );

  router.post("/:id/commentPost", auth, (req, res) =>
    commentPost(req, res, channel)
  );

  return router;
};
