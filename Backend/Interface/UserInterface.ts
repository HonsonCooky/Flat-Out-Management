import {app} from "../index";

export const initializeUserInterface = () => {
    app.post("/post/user", (req, res) => {
        res.send("Here")
    })
}