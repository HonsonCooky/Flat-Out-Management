import {app, isDbConnected} from "../index";

export const initializeUtilInterface = () => {
    app.get("/", (req, res) => {
      res.status(200).send("Heroku: True, MongoDB: " + isDbConnected())
    })
}