const postService = require("../services/post-service");
const httpStatusCode = require("../utils/httpStatusCode");

//New mehod for fatches the posts based on page number
const getPosts = async (req, res) => {
  const { page, search, tags } = req.query;
  try {
    const posts = await postService.getPostsByPage({ page, search, tags });
    return res.status(httpStatusCode.OK).send(posts);
  } catch (error) {
    return res.status(error.statusCode).json({
      message: error.message,
      status: "failed",
      error: error,
    });
  }
};

const getSinglePost = async (req, res) => {
  const id = req.params.id;
  try {
    const singlePost = await postService.getPostById(id);
    return res.status(httpStatusCode.OK).send(singlePost);
  } catch (error) {
    return res.status(error.statusCode).json({
      message: error.message,
      status: "failed",
      error: error,
    });
  }
};

const createPost = async (req, res) => {
  const post = req.body;
  try {
    const newPost = await postService.createPost(post);
    return res.status(httpStatusCode.CREATED).send(newPost);
  } catch (error) {
    return res.status(error.statusCode).json({
      message: error.message,
      status: "failed",
      error: error,
    });
  }
};

const updatePost = async (req, res) => {
  const { id: _id } = req.params;
  const updatedData = req.body;
  try {
    const updatedPost = await postService.updatePost(_id, updatedData);
    return res.status(httpStatusCode.OK).send(updatedPost);
  } catch (error) {
    return res.status(error.statusCode).json({
      message: error.message,
      status: "failed",
      error: error,
    });
  }
};

const deletePost = async (req, res) => {
  const { id: _id } = req.params;
  try {
    const data = await postService.deletePost(_id);
    return res.status(httpStatusCode.OK).json(data);
  } catch (error) {
    return res.status(error.statusCode).json({
      message: error.message,
      status: "failed",
      error: error,
    });
  }
};

module.exports = {
  getPosts,
  getSinglePost,
  createPost,
  updatePost,
  deletePost,
};
