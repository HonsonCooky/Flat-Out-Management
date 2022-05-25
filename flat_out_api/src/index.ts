import express, {Request, Response} from "express";
import helmet from "helmet";
import {connect} from "mongoose";
import {CONFIG} from "./config";
import {errorHandler} from "./middleware/error-handling";

require('./schemas/entities/user-schema')
require('./schemas/entities/group-schema')
require('./schemas/non-entities/table-schema')

/** -----------------------------------------------------------------------------------------------------------------
 * MONGODB CONNECTION AND SETUP
 -----------------------------------------------------------------------------------------------------------------*/
// Create a connection to the MongoDB instance
connect(CONFIG.mongoDb.connectionStr).then(async () => {
  CONFIG.mongoDb.isDbConnected = true
  // initGridFs().then(() => CONFIG.mongoDb.isGridConnected = true).catch()
  apiInitNormalMode()
}).catch(apiInitErrorMode)

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
  // webAPI.use(apiRoutes)

  // Handle errors if the request is invalid
  webAPI.use(errorHandler)

  // Lets go!
  webAPI.listen(CONFIG.express.port, () => {
    if (CONFIG.devMode) console.log(`http://localhost:${CONFIG.express.port}`)
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
      msg: 'Database is currently unavailable for interactions. Interactions with the server will be unavailable'
    })
  })

  webAPIErrMode.listen(CONFIG.express.port, () => {
    if (CONFIG.devMode) console.log(`http://localhost:${CONFIG.express.port}`)
    else console.log(`https://flat-out-management-api.herokuapp.com`)
  })
}