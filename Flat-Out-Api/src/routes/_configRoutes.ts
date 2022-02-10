import express, {Request, Response} from "express";
import env from "../config/_envConfig";

/**
 * UtilInterface: The _configRoutes.ts contains one function for initializing some basic functionality for the
 * Heroku + MongoDB backend. Getting logs, or waking up the dyno. Small unassociated functionality resides here.
 */

const _configRoutes = express.Router()

_configRoutes.get('/', (req: Request, res: Response) => {
  res.status(200).send({msg: {Heroku: true, MongoDB: env.mongo.isDbConnected()}})
})

export = _configRoutes