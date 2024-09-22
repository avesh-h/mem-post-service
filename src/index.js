const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const { PORT } = require("./config/serverConfig");
const connectionToDB = require("./config/dbConfig");
const serverRoutes = require("./routes/index");
const globalErrorMiddleware = require("./middlewares/error-middleware");
const { createChannel } = require("./utils/messageQueue");

// Controller: Handles HTTP logic.
// Service: Contains business rules and logic.
// Repository: Directly interacts with the database.

const setupAndStartServer = async () => {
  // middlewares
  app.use(cors());
  app.use(bodyParser.json({ limit: "30mb", extended: true }));
  app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

  // Create MQ channel
  const channel = await createChannel();

  //Db connection
  connectionToDB(channel);

  // The method we did here called DEPENDENCY INJECTION for use the same channel object in the all the routes and controllers of the repo.

  //Global express store for the store values(like context)

  // app.locals.channel = channel;

  app.use("/api", serverRoutes(channel));

  //Global error handling
  app.use(globalErrorMiddleware);

  app.listen(PORT, async () => {
    console.log("Post Service is now on " + PORT);
  });
};

//Start service
setupAndStartServer();
