import {app} from "../index";


/**
 * GroupInterface: The GroupInterface.ts contains one function for calling and handling (parsing handling to
 * middleware) GroupManagement functions. In a nutshell, it is the EXPRESS interface setup relaying calls to the
 * Mongoose backend in /Management/GroupManagement.ts
 */
export function initializeGroupInterface() {
    app.post('/post/group/create', (req, res, next) => {

    })
}