import {app} from "../index";
import {getLogs, isDbConnected} from "../Util/UtilFunctions";

/**
 * UtilInterface: The UtilInterface.ts contains one function for initializing some basic functionality for the
 * Heroku + MongoDB backend. Getting logs, or waking up the dyno. Small unassociated functionality resides here.
 */
export const initializeUtilInterface = () => {
  app.get("/", (req, res) => {
    res.status(200).send({Heroku: true, MongoDB: isDbConnected()})
  })

  app.get("/get/logs", (req, res) => {
    res.status(200).send(JSON.stringify(getLogs()))
  })
}