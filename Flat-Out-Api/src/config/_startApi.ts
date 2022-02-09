import express from "express";
import helmet from "helmet";
import userRoutes from "../routes/UserRoutes";
import groupRoutes from "../routes/GroupRoutes";
import listRoutes from "../routes/ListRoutes";
import _configRoutes from "../routes/_configRoutes";
import {errorHandler} from "../middleware/ErrorHandling";
import env from "./_envConfig";
import _logger from "./_logger";

export function _startApi() {
  let webAPI = express()

  // middleware BEFORE requests
  webAPI.use(helmet())
  webAPI.use(express.json())

  // Initialize Routes
  webAPI.use('/user', userRoutes)
  webAPI.use('/group', groupRoutes)
  webAPI.use('/list', listRoutes)
  webAPI.use('', _configRoutes)

  // middleware AFTER requests
  webAPI.use(errorHandler)

  // Lets go!
  webAPI.listen(env.express.port, () => {
    _logger.info("Heroku connected");
    console.log(`http://localhost:${env.express.port}`)
  })
}