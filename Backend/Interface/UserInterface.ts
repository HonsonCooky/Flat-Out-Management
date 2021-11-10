import {app, jsonHandler} from "../index";


export function initializeUserInterface () {
    app.get("/get/user/:u&:p", jsonHandler, (req, res) => {
        // TODO get user data
    })

    app.post("/post/user/signup", jsonHandler, (req, res) => {
        // TODO signup user
    })

    app.post("/post/user/login", jsonHandler, (req, res) => {
        // TODO login user
    })

    app.post("/post/user/update", jsonHandler, (req, res) => {
        // TODO update pre-existing user
    })
}