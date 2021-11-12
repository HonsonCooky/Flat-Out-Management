import {app} from "../index";
import {userGet, userLogin, userRemove, userSignup, userUpdate} from "../Management/UserManagement";
import {SanitizedUser} from "../Util/Schemas";

/**
 * UserInterface: Not to be confused with a UI, the UserInterface.ts contains one function for calling and handling
 * (parsing handling to middleware) UserManagement functions. In a nutshell, it is the EXPRESS interface setup,
 * relaying calls to the Mongoose backend in /Management/UserManagement.ts
 */
export function initializeUserInterface() {
    app.post("/post/user/signup", (req, res, next) => {
        userSignup(req.body)
            .then((user: SanitizedUser) => res.status(200).send(user))
            .catch(e => next(e))
    })

    app.post('/post/user/login', (req, res, next) => {
        userLogin(req.body)
            .then((user: SanitizedUser) => res.status(200).send(user))
            .catch(e => next(e))
    })

    app.post('/post/user/update', (req, res, next) => {
        userUpdate(req.body)
            .then((user: SanitizedUser) => res.status(200).send(user))
            .catch(e => next(e))
    })

    app.post('/post/user/remove', (req, res, next) => {
        userRemove(req.body)
            .then((user: SanitizedUser) => res.status(200).send(user))
            .catch(e => next(e))
    })

    app.get('/get/user/:i&:p', (req, res, next) => {
        userGet(req.params)
            .then((user: SanitizedUser) => res.status(200).send(user))
            .catch(e => next(e))
    })
}