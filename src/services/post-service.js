const postRepository = require("../repositories/post-repository");

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
}

module.exports = new PostService();
