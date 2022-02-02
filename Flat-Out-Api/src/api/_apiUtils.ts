import {getLogs, isDbConnected} from "../Logger";
import express from "express";
/**
 * UtilInterface: The _apiUtils.ts contains one function for initializing some basic functionality for the
 * Heroku + MongoDB backend. Getting logs, or waking up the dyno. Small unassociated functionality resides here.
 */

const utilRoutes = express.Router()

utilRoutes.get('/',  (req, res) => {
  res.status(200).send({msg: {Heroku: true, MongoDB: isDbConnected()}})
})

utilRoutes.get("/get/logs", (req, res) => {
  res.status(200).send({msg: JSON.stringify(getLogs())})
})

export = utilRoutes