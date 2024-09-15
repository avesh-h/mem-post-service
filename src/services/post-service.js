const postRepository = require("../repositories/post-repository");

// ALL the buisness logic will be here

class PostService {
  async getPostsByPage(page) {
    try {
      //Maximum Numbers of the posts on single page
      const LIMIT = 8;

      //get index number of the first post on every page
      const startIndex = (Number(page) - 1) * LIMIT;

      const total = await postRepository.getTotalPostsCount();

      // Prepare the query object here (e.g., filtering posts)
      const query = {}; // Add conditions if needed (e.g., based on user inputs)

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
