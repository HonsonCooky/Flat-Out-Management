import {app, jsonHandler} from "../index";
import {signup} from "../Management/UserManagement";

/**
 * User Interfaces: Handle high level API requests. Create an API to utilize elsewhere, and handle errors.
 */

/** ------------------------------------------------------------------------------------------------------------------
 * Methods are designed to throw errors to propagate issues with the provided information.
 * In the case where an error is caught, a detailed message is parsed back to the client, detailing if it was a client
 * error, or a server side error. The messages parsed to the client should be in a format such that they can be simply
 * displayed as is.
 ------------------------------------------------------------------------------------------------------------------ */
function errorHandler(e: Error, res: any) {
    e.message.startsWith("400") ?
        res.status(400).send("[Client Error]: " + e.message
            .replace(/400:|,/g, "\n")
            .replace("Users validation failed:", "")) :
        res.status(500).send("[Server Error]: " + e.message)
}

function tryCatchSync(successMsg: string, res: any, fn: Function) {
    try {
        fn();
        res.status(200).send(successMsg);
    } catch (e) {
        errorHandler(e as Error, res);
    }
}

async function tryCatchAsync(successMsg: string, res: any, fn: Function) {
    try {
        await fn();
        res.status(200).send(successMsg);
    } catch (e) {
        errorHandler(e as Error, res);
    }
}

/** ------------------------------------------------------------------------------------------------------------------
 * API initializers
 ------------------------------------------------------------------------------------------------------------------ */

export function initializeUserInterface() {
    app.get("/get/user/:u&:p", jsonHandler, (req, res) => {
        // TODO get user data
    })

    app.post("/post/user/signup", jsonHandler, (req, res) => {
        tryCatchAsync(`${req.body.username} registered with group ${req.body.group}`, res, () => {
            signup(req.body)
        })
    })

    app.post("/post/user/login", jsonHandler, (req, res) => {
        // TODO login user
    })

    app.post("/post/user/update", jsonHandler, (req, res) => {
        // TODO update pre-existing user
    })
}