import {app} from "../index";


/**
 * ListInterface: The ListInterface.ts contains one function for calling and handling (parsing handling to
 * middleware) ListManagement functions. In a nutshell, it is the EXPRESS interface setup relaying calls to the
 * Mongoose backend in /Management/ListManagement.ts
 */
export function initializeListInterface(){
    app.post('/post/list/create', (req, res, next) => {
    })
}