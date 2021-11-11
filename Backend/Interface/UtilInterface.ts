import {app} from "../index";
import {isDbConnected} from "../Util/UtilFunctions";

export const initializeUtilInterface = () => {
    app.get("/", (req, res) => {
      res.status(200).send("Heroku: True, MongoDB: " + isDbConnected())
    })
}