const PostModel = require("../models/postModel");

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
    return await PostModel.find(query)
      .sort({ _id: -1 })
      .limit(limit)
      .skip(startIndex);
  }
  catch(error) {
    throw error;
  }

  async getTotalPostsCount() {
    return await PostModel.countDocuments({});
  }
}

// We're exporting a singleton instance of the PostRepository with module.exports = new PostRepository();. This ensures that the same instance of the PostRepository is reused every time it's required in different parts of the application.

module.exports = new PostRepository();
