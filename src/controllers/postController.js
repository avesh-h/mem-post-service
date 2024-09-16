const PostModel = require("../models/postModel");
const postRepository = require("../repositories/post-repository");
const postService = require("../services/post-service");

//New mehod for fatches the posts based on page number
const getPosts = async (req, res) => {
  const { page, search, tags } = req.query;
  try {
    const posts = await postService.getPostsByPage({ page, search, tags });
    return res.status(200).send(posts);
  } catch (error) {
    return res.status(404).send(error.message);
  }
};

module.exports = { getPosts };
