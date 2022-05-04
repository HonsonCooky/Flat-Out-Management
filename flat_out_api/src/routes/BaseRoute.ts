import express, {Request, Response} from "express";
import {env} from "../config/Config";
import {fomLogger} from "../config/Logger";

const baseRoute = express.Router({mergeParams: true})

baseRoute.get('', async (req: Request, res: Response) => {
  let logs = await fomLogger.get()
  res.status(200).send({
    msg: `${{
      Heroku: true,
      MongoDB: env.mongo.isDbConnected(),
      logs
    }}`
  })
})

export = baseRoute