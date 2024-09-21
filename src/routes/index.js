const express = require("express");
const postRoutes = require("./v1/postRoutes");

const router = express.Router();

// Get channel from the main index file so all the future routes and contollers can receive the same common channel object of the rabbit MQ.

module.exports = (channel) => {
  router.use("/v1/posts/", postRoutes(channel));
  return router;
};
