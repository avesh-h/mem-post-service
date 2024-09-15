require("dotenv").config();

module.exports = {
  PORT: process.env.PORT,
  LIVE_URL: process.env.LIVE_URL,
  DB_URI: process.env.DB_URI,
};
