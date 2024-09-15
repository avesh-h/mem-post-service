const express = require("express");
const postRoutes = require("./v1/postRoutes");

const router = express.Router();

router.use("/v1/posts", postRoutes);

module.exports = router;
