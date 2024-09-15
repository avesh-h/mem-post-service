const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const { PORT } = require("./config/serverConfig");
const connectionToDB = require("./config/dbConfig");
const serverRoutes = require("./routes/index");
const PostModel = require("./models/postModel");

// Controller: Handles HTTP logic.
// Service: Contains business rules and logic.
// Repository: Directly interacts with the database.

const setupAndStartServer = async () => {
  // middlewares
  app.use(cors());
  app.use(bodyParser.json({ limit: "30mb", extended: true }));
  app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

  //Db connection
  connectionToDB();

  app.use("/api", serverRoutes);

  app.listen(PORT, async () => {
    console.log("Post Service is now on " + PORT);
  });
};

//Start service
setupAndStartServer();
