import express, {Request, Response} from "express";
import {CONFIG} from "../config";


const baseRoute = express.Router({mergeParams: true})

baseRoute.get('', async (req: Request, res: Response) => {
  res.status(200).send({
    msg: `${{
      Heroku: 'Connected',
      MongoDB: CONFIG.mongoDb.isDbConnected ? 'Connected' : 'Not Connected',
      GridFS: CONFIG.mongoDb.isGridConnected ? 'Connected' : 'Not Connected',
    }}`
  })
})

export = baseRoute