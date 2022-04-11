import express from "express";
import helmet from "helmet";
import baseRoute from "../routes/BaseRoute";
import {errorHandler} from "../middleware/ErrorHandling";
import {fomLogger} from "./Logger";
import {env} from "./Config";
import {apiRoutes} from "../routes/ApiRoutes";

export function startApi() {
  let webAPI = express()

  // middleware BEFORE requests
  webAPI.use(helmet())
  webAPI.use(express.json())

  // Initialize Routes
  webAPI.use(baseRoute)
  webAPI.use(apiRoutes)

  // middleware AFTER requests
  webAPI.use(errorHandler)

  // Lets go!
  webAPI.listen(env.express.port, () => {
    fomLogger.info("Heroku connected");
    if (env.devMode) console.log(`http://localhost:${env.express.port}`)
    else console.log(`https://flat-out-management-api.herokuapp.com`)
  })
}