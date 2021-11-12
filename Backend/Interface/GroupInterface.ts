import {app} from "../index";
import {groupCreate, groupGet, groupLogin, groupRemove, groupUpdate} from "../Management/GroupManagement";
import {SanitizedGroup} from "../Util/Schemas";


/**
 * GroupInterface: The GroupInterface.ts contains one function for calling and handling (parsing handling to
 * middleware) GroupManagement functions. In a nutshell, it is the EXPRESS interface setup relaying calls to the
 * Mongoose backend in /Management/GroupManagement.ts
 */
export function initializeGroupInterface() {
    app.post('/post/group/create', (req, res, next) => {
        groupCreate(req.body)
            .then((group: SanitizedGroup) => res.status(200).send(group))
            .catch(e => next(e))
    })

    app.post('/post/group/login', (req, res, next) => {
        groupLogin(req.body)
            .then((group: SanitizedGroup) => res.status(200).send(group))
            .catch(e => next(e))
    })

    app.post('/post/group/update', (req, res, next) => {
        groupUpdate(req.body)
            .then((group: SanitizedGroup) => res.status(200).send(group))
            .catch(e => next(e))
    })

    app.post('/post/group/remove', (req, res, next) => {
        groupRemove(req.body)
            .then((group: SanitizedGroup) => res.status(200).send(group))
            .catch(e => next(e))
    })

    app.get('/get/group/:i&:p', (req, res, next) => {
        groupGet(req.params)
            .then((group: SanitizedGroup) => res.status(200).send(group))
            .catch(e => next(e))
    })
}