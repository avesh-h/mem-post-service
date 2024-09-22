require("dotenv").config();

module.exports = {
  PORT: process.env.PORT,
  LIVE_URL: process.env.LIVE_URL,
  DB_URI: process.env.DB_URI,
  EXCHANGE_NAME: process.env.EXCHANGE_NAME,
  BINDING_KEY: process.env.BINDING_KEY,
  MESSAGE_BROKER_URL: process.env.MESSAGE_BROKER_URL,
  AUTH_SERVICE_URL: process.env.AUTH_SERVICE_URL,
  POST_SERVICE_URL: process.env.POST_SERVICE_URL,
  FRONTEND_URL: process.env.FRONTEND_URL,
  MAIL_SERVICE_URL: process.env.MAIL_SERVICE_URL,
  CHAT_SERVICE_URL: process.env.CHAT_SERVICE_URL,
};
