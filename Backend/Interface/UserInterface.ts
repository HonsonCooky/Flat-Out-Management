import {app} from "../index";
import {signup} from "../Management/UserManagement";

/**
 * User Interfaces: Handle high level API requests. Create an API to utilize elsewhere, and handle errors.
 */

/** ------------------------------------------------------------------------------------------------------------------
 * API initializers
 ------------------------------------------------------------------------------------------------------------------ */

export function initializeUserInterface() {
    app.post("/post/user/signup", (req, res, next) => {
        signup(req.body)
            .then(() => res.status(200).send(`${req.body.username} signed up!`))
            .catch(e => next(e))
    })
}