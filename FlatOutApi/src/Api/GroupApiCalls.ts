import {app} from "../index";


/**
 * GroupInterface: The GroupApiCalls.ts contains one function for calling and handling (parsing handling to
 * middleware) GroupManagement functions. In a nutshell, it is the EXPRESS interface setup relaying calls to the
 * Mongoose backend in /Management/GroupManagement.ts
 */
export function initializeGroupInterface() {
    app.post('/post/group/create')
    app.post('/post/group/login')
    app.post('/post/group/join')
    app.post('/post/group/join_request')
    app.post('/post/group/accept_request')
    app.post('/post/group/update')
    app.post('/post/group/delete')
    app.get('/get/group/names')
}