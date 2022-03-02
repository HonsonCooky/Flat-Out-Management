import express from "express";
import helmet from "helmet";
import baseRoute from "../routes/BaseRoute";
import {errorHandler} from "../middleware/ErrorHandling";
import env from "./EnvConfig";
import _logger from "./Logger";
import userRoutes from "../routes/UserRoutes";
import groupRoutes from "../routes/GroupRoutes";
import {extractInformation} from "../middleware/ExtractInformation";

export function startApi() {
  let webAPI = express()

  // middleware BEFORE requests
  webAPI.use(helmet())
  webAPI.use(express.json())

  // Initialize Routes
  webAPI.all('*', extractInformation)
  webAPI.use('', baseRoute)
  webAPI.use('/user', userRoutes)
  webAPI.use('/group', groupRoutes)

  // middleware AFTER requests
  webAPI.use(errorHandler)

  // Lets go!
  webAPI.listen(env.express.port, () => {
    _logger.info("Heroku connected");
    console.log(`http://localhost:${env.express.port}`)
  })
}