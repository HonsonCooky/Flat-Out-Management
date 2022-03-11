import express, {Request, Response} from "express";
import {env} from "../config/Config";
import {fomLogger} from "../config/Logger";

/**
 * UtilInterface: The BaseRoute.ts contains one function for initializing some basic functionality for the
 * Heroku + MongoDB backend. Getting logs, or waking up the dyno. Small unassociated functionality resides here.
 */

const baseRoute = express.Router()

baseRoute.get('', async (req: Request, res: Response) => {
  let logs = await fomLogger.get()
  res.status(200).send({
    msg: {
      Heroku: true,
      MongoDB: env.mongo.isDbConnected(),
      logs
    }
  })
})

export = baseRoute