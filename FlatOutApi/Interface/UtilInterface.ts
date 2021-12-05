import {app} from "../index";
import {getLogs, isDbConnected} from "../Util/UtilFunctions";

export const initializeUtilInterface = () => {
    app.get("/", (req, res) => {
      res.status(200).send("Heroku: True, MongoDB: " + isDbConnected())
    })

    app.get("/get/logs", (req, res) => {
        res.status(200).send(getLogs().reverse().join('</br>'))
    })

    app.get("/get/wakeup", (req, res) => {
        res.status(200).send(isDbConnected())
    })
}