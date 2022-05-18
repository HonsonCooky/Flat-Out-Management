import express, {Request, Response} from "express";
import helmet from "helmet";
import {connect} from "mongoose";
import {env} from "./config/Config";
import {fomLogger} from "./config/Logger";
import baseRoute from "./routes/BaseRoute";
import {apiRoutes} from "./routes/ApiRoutes";
import {errorHandler} from "./middleware/ErrorHandling";
import {initGridFs} from "./management/AvatarManagement";

require('./schemas/documents/UserSchema')
require('./schemas/documents/GroupSchema')
require('./schemas/documents/TableSchema')

/** -----------------------------------------------------------------------------------------------------------------
 * MONGODB CONNECTION AND SETUP
 -----------------------------------------------------------------------------------------------------------------*/
// Create a connection to the MongoDB instance
connect(env.mongo.connectionStr).then(async () => {
  fomLogger.info("MongoDB connected")
  await initGridFs()
  apiInitNormalMode()
}).catch(() => {
  fomLogger.error("MongoDB unavailable")
  apiInitErrorMode()
})


/** -----------------------------------------------------------------------------------------------------------------
 * INITIALIZE THE EXPRESS API
 -----------------------------------------------------------------------------------------------------------------*/
/**
 * Initialize the express backend api normally (with full functionality)
 */
export function apiInitNormalMode() {
  let webAPI = express()

  // middleware BEFORE requests
  webAPI.use(helmet())
  webAPI.use(express.json())
  webAPI.use(express.urlencoded({extended: true}))

  // Initialize Routes
  webAPI.use(baseRoute)
  webAPI.use(apiRoutes)

  // Handle errors if the request is invalid
  webAPI.use(errorHandler)

  // Lets go!
  webAPI.listen(env.express.port, () => {
    fomLogger.info("Heroku connected");
    if (env.devMode) console.log(`http://localhost:${env.express.port}`)
    else console.log(`https://flat-out-management-api.herokuapp.com`)
  })
}

/**
 * If some error occurs outside the express server, something that means the functionality can not continue, then
 * open the express server in error mode.
 */
export function apiInitErrorMode() {
  // Start the api, but only have one endpoint with the error message
  let webAPIErrMode = express()

  webAPIErrMode.use((req: Request, res: Response) => {
    res.status(500).send({
      msg: 'Database is currently unavailable for interactions. Backend interactions will be unavailable'
    })
  })

  webAPIErrMode.listen(env.express.port, () => {
    fomLogger.info("Heroku connected");
    if (env.devMode) console.log(`http://localhost:${env.express.port}`)
    else console.log(`https://flat-out-management-api.herokuapp.com`)
  })
}