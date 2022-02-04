import mongoose from "mongoose";
import webAPI from "./config/ExpressConfiguration";
import logger from "./config/Logging";
import envConfig from "./config/EnvrionmentConfig";

/**
 * MONGODB:
 * Connect to the MongoDB interface. Set some variables such that deprecated fields are used/unused. MongoDB's
 * connections are slow, so doing it asynchronously first should help speed up the connection process.
 */
mongoose.connect(envConfig.mongoDb)
  .then(() => logger.info("MongoDB connected"))
  .catch(e => logger.error(`MongoDB connection failed: ${e.message}`))

/**
 * EXPRESS:
 * Instantiate the express interface. The order of instantiation is important here. middleware declared before the API
 * interfaces run BEFORE each HTTP request. middleware declared after the API interface run AFTER each HTTP request.
 */
webAPI.listen(envConfig.port, () => {
  logger.info("Heroku connected");
  console.log(`http://localhost:${envConfig.port}`)
})
