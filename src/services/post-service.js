const postRepository = require("../repositories/post-repository");
const ClientError = require("../utils/errors/client-error");
const httpStatusCode = require("../utils/httpStatusCode");

// ALL the buisness logic will be here

class PostService {
  async getPostsByPage(queryObj) {
    const { page, search, tags } = queryObj;
    try {
      //Maximum Numbers of the posts on single page
      const LIMIT = 8;

      //get index number of the first post on every page
      const startIndex = (Number(page) - 1) * LIMIT;

      const total = await postRepository.getTotalPostsCount();

      // TODO: Need to refactor this because when we search by title and tags both together is not working

      let query = {};
      // Add search conditionally
      if (search) {
        const title = new RegExp(search, "i");
        query.title = title; // Add title to the query if search is present
      }

      // Add tags conditionally
      if (tags) {
        query.tags = { $in: tags.split(",") }; // Add tags to the query if tags are present
      }

      //.limit method fetches the only number of the posts you want in this case is 8
      //.skip method fetches the post of that only specific page number like example if we want to go in 3rd page we don't want to fetch the posts of the first two pages..
      const posts = await postRepository.getPosts(query, LIMIT, startIndex);

      return {
        data: posts,
        currentPage: page,
        numberOfPages: Math.ceil(total / LIMIT),
      };
    } catch (error) {
      throw error;
    }
  }

  async getPostById(id) {
    try {
      const post = await postRepository.getSinglePost(id);
      return post;
    } catch (error) {
      throw error;
    }
  }

  async createPost(userId, post) {
    try {
      const createdPost = await postRepository.createPost(userId, post);
      return createdPost;
    } catch (error) {
      throw error;
    }
  }

  async updatePost(id, postData) {
    try {
      if (!postRepository.isValidMongoID(id)) {
        throw new ClientError(
          "ValidationError",
          "Post is not found!",
          "",
          httpStatusCode.BAD_REQUEST
        );
      }
      const updatedPost = await postRepository.updatePost(id, postData);
      return updatedPost;
    } catch (error) {
      throw error;
    }
  }

  async deletePost(id) {
    try {
      if (!postRepository.isValidMongoID(id)) {
        throw new ClientError(
          "ValidationError",
          "Post is not found!",
          "",
          httpStatusCode.BAD_REQUEST
        );
      }
      await postRepository.deletePost(id);
      return { status: "success", message: "Post Deleted successfully!" };
    } catch (error) {
      throw error;
    }
  }

  async likePost(userId, postId) {
    try {
      if (!userId) {
        //Unauthenticated
        throw new ClientError(
          "Unauthorized!",
          "User is unauthorized!",
          "",
          httpStatusCode.NOT_FOUND
        );
      }
      //Find post for the like
      if (!postRepository.isValidMongoID(postId)) {
        throw new ClientError(
          "ValidationError",
          "Post is not found!",
          "",
          httpStatusCode.BAD_REQUEST
        );
      }
      const post = await postRepository.getSinglePost(postId);
      //now we have to check the user id is in the like section or not (each user can only like once and second time when he clicked it's going to be dislike the post)
      const likesIndex = post.likes.findIndex((id) => {
        return id.toString() === userId;
      });
      if (likesIndex === -1) {
        //If the id is not found in likesIndex so for that we add -1
        //For liking the post (logic of like the post)
        post.likes.push(userId);
      } else {
        //FOr dislike the post
        post.likes = post.likes.filter((id) => {
          return id.toString() !== userId;
        });
      }
      const likingPost = await postRepository.updatePost(postId, post);
      return likingPost;
    } catch (error) {
      throw error;
    }
  }

  async commentPost(userId, postId, comment) {
    try {
      if (!postRepository.isValidMongoID(postId)) {
        throw new ClientError(
          "ValidationError",
          "Post is not found!",
          "",
          httpStatusCode.BAD_REQUEST
        );
      }

      //First we find the post from data base
      const post = await postRepository.getSinglePost(postId);
      if (!post) {
        throw new ClientError(
          "ValidationError",
          "Post is not found!",
          "",
          httpStatusCode.BAD_REQUEST
        );
      }

      //push the commment inside comments array
      post.comments.push({ userId, comment });

      //then update the whole post
      const updatedPost = await postRepository.updatePost(postId, post);
      return updatedPost;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new PostService();
