import express from "express";
import {isDbConnected} from "../config/ConfigUtils";
import {LogModel} from "../schemas/LogSchema";
/**
 * UtilInterface: The ConfigRoutes.ts contains one function for initializing some basic functionality for the
 * Heroku + MongoDB backend. Getting logs, or waking up the dyno. Small unassociated functionality resides here.
 */

const configRoutes = express.Router()

configRoutes.get('/',  (req, res) => {
  res.status(200).send({msg: {Heroku: true, MongoDB: isDbConnected()}})
})

configRoutes.get("/get/logs", async (req, res) => {
  res.status(200).send({msg: await LogModel.find()})
})

export = configRoutes