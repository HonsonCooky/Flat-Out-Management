import {app} from "../index";
import {groupLogin, groupCreate} from "../Management/GroupManagement";
import {FOMRes} from "../_Interfaces";


/**
 * GroupInterface: The GroupInterface.ts contains one function for calling and handling (parsing handling to
 * middleware) GroupManagement functions. In a nutshell, it is the EXPRESS interface setup relaying calls to the
 * Mongoose backend in /Management/GroupManagement.ts
 */
export function initializeGroupInterface() {
    app.post('/post/group/create', (req, res, next) => {
        groupCreate(req.body)
          .then((fomRes: FOMRes) => res.status(200).send(fomRes))
          .catch(e => next(e))
    })

    app.post('/post/group/login', (req, res, next) => {
        groupLogin(req.body)
          .then((fomRes: FOMRes) => res.status(200).send(fomRes))
          .catch(e => next(e))
    })

    app.post('/post/group/join', (req, res, next) => {
    })

    app.post('/post/group/join_request', (req, res, next) => {
    })

    app.post('/post/group/accept_request', (req, res, next) => {
    })

    app.post('/post/group/update', (req, res, next) => {
    })

    app.get('/get/group/names', (req, res, next) => {
    })
}