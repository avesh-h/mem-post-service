require("dotenv").config();

module.exports = {
  PORT: process.env.PORT,
  LIVE_URL: process.env.LIVE_URL,
  DB_URI: process.env.DB_URI,
  EXCHANGE_NAME: process.env.EXCHANGE_NAME,
  BINDING_KEY: process.env.BINDING_KEY,
  MESSAGE_BROKER_URL: process.env.MESSAGE_BROKER_URL,
};
