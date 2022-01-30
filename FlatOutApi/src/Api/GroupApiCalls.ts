import {app} from "../index";
import {groupCreate, groupLogin} from "../Management/GroupManagement";
import {handlePostCall} from "./_ApiCallHandler";


/**
 * GroupInterface: The GroupApiCalls.ts contains one function for calling and handling (parsing handling to
 * middleware) GroupManagement functions. In a nutshell, it is the EXPRESS interface setup relaying calls to the
 * Mongoose backend in /Management/GroupManagement.ts
 */
export function initializeGroupInterface() {
    app.post('/post/group/create',
      (req, res, next) =>
        handlePostCall(groupCreate, req, res, next))

    app.post('/post/group/login',
      (req, res, next) =>
        handlePostCall(groupLogin, req, res, next))

    app.post('/post/group/join')

    app.post('/post/group/join_request')

    app.post('/post/group/accept_request')

    app.post('/post/group/update')

    app.post('/post/group/delete')

    app.get('/get/group/names')
}