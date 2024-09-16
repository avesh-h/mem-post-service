const PostModel = require("../models/postModel");
const ValidationError = require("../utils/errors/validation-error");

//DB related methods will all come here even the aggreagation or queries all will come her except business logic of those queries.

// EX:
// class PostRepository {
//   async getPostsByAggregation(aggregationPipeline) {
//     try {
//       return PostModel.aggregate(aggregationPipeline);
//     } catch (error) {
//       throw error;
//     }
//   }
// }
class PostRepository {
  async getPosts(query, limit, startIndex) {
    try {
      return await PostModel.find(query)
        .sort({ _id: -1 })
        .limit(limit)
        .skip(startIndex);
    } catch (error) {
      throw error;
    }
  }

  async getTotalPostsCount() {
    return await PostModel.countDocuments({});
  }

  async getSinglePost(postId) {
    try {
      const post = await PostModel.findById(postId);
      return post;
    } catch (error) {
      throw error;
    }
  }

  async createPost(post) {
    try {
      const newPost = new PostModel({
        ...post,
        creator: post.userId,
        createdAt: new Date().toISOString(),
      });
      await newPost.save();
      return newPost;
    } catch (error) {
      if (error.name === "ValidationError") {
        throw new ValidationError(error);
      }
      throw error;
    }
  }

  async updatePost(id, postData) {
    try {
      const updatedPost = await PostModel.findByIdAndUpdate(id, postData);
      return updatedPost;
    } catch (error) {
      throw error;
    }
  }

  async deletePost(id) {
    try {
      const deletedPost = await PostModel.findByIdAndDelete(id);
      return deletedPost;
    } catch (error) {
      throw error;
    }
  }
}

// We're exporting a singleton instance of the PostRepository with module.exports = new PostRepository();. This ensures that the same instance of the PostRepository is reused every time it's required in different parts of the application.

module.exports = new PostRepository();
