import {app} from "../index";
import {userGet, userLogin, userRemove, userSignup, userUpdate} from "../Management/UserManagement";
import {SanitizedUser} from "../Util/Schemas";

/**
 * User Interfaces: Handle high level API requests. Create an API to utilize elsewhere, and handle errors.
 */

/** ------------------------------------------------------------------------------------------------------------------
 * API initializers
 ------------------------------------------------------------------------------------------------------------------ */

/**
 * Idea: Parse back the user in as many instances as possible, to reduce the number of time '/get/user/:u&:p' is
 * needed. Overall, reducing the number of calls to the API.
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

    app.get('/get/user/:u&:p', (req, res, next) => {
        userGet(req.params)
            .then((user: SanitizedUser) => res.status(200).send(user))
            .catch(e => next(e))
    })
}