import express, {Request, Response} from "express";
import env from "../config/_envConfig";

/**
 * UtilInterface: The ConfigRoutes.ts contains one function for initializing some basic functionality for the
 * Heroku + MongoDB backend. Getting logs, or waking up the dyno. Small unassociated functionality resides here.
 */

const configRoutes = express.Router()

configRoutes.get('/', (req: Request, res: Response) => {
  res.status(200).send({msg: {Heroku: true, MongoDB: env.mongo.isDbConnected()}})
})

export = configRoutes