import express from "express";
import helmet from "helmet";
import configRoutes from "../routes/ConfigRoutes";
import {errorHandler} from "../middleware/ErrorHandling";
import env from "./_envConfig";
import _logger from "./_logger";

export function _startApi() {
  let webAPI = express()

  // middleware BEFORE requests
  webAPI.use(helmet())
  webAPI.use(express.json())

  // Initialize Routes
  webAPI.use('', configRoutes)

  // middleware AFTER requests
  webAPI.use(errorHandler)

  // Lets go!
  webAPI.listen(env.express.port, () => {
    _logger.info("Heroku connected");
    console.log(`http://localhost:${env.express.port}`)
  })
}