const jwt = require("jsonwebtoken");
const ClientError = require("../utils/errors/client-error");
const ServiceError = require("../utils/errors/service-error");
const httpStatusCode = require("../utils/httpStatusCode");

// const secret_key = "test";
//This middleware function is use for check user has valid token or not and this middleware apply on both custom token and also google token

//if token length is less than 500 then it means it custom generated token and if length is more than 500 then it's google token

const auth = async (req, res, next) => {
  const token = req?.headers?.authorization?.split(" ")[1];
  try {
    if (!token) {
      throw new ClientError(
        "Unauthorized!",
        "No token is provided!",
        "Token missing!",
        httpStatusCode.BAD_REQUEST
      );
    }
    const isCustomAuth = token.length < 500;
    let decodeData;
    //For custom token
    if (token && isCustomAuth) {
      decodeData = jwt.verify(token, "test");
      //we have to see id from the decodeData and save in another variable because we don't know which user is like the post or delete the post decodeData id is for the check the induviduality for the each user so we can access this id in next() function.

      req.userId = decodeData?.id;
    }
    //for google token
    else {
      decodeData = jwt.decode(token);

      //sub is for google which is differentiate each individual user from others
      req.userId = decodeData?.sub;
    }
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      throw new ServiceError("Token has expired", 401); // 401 Unauthorized for expired token
    }
    next(error);
  }
};

module.exports = auth;

//SO when this code is going to be executed so when user is liking the post or delete the post then for that is going to be api call for that so at that time first it will check that user is authorised or not with this above auth() function.

// middleware function can access our req or res object before call the api that's why it's called middleware.
