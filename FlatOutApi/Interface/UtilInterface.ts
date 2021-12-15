import {app} from "../index";
import {getLogs, isDbConnected} from "../Util/UtilFunctions";

export const initializeUtilInterface = () => {
  app.get("/", (req, res) => {
    res.status(200).send({Heroku: true, MongoDB: isDbConnected()})
  })

  app.get("/get/logs", (req, res) => {
    res.status(200).send(JSON.stringify(getLogs()))
  })

  app.get("/get/wakeup", (req, res) => {
    res.status(200).send({connected: isDbConnected()})
  })
}