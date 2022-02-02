import express from "express";


/**
 * GroupInterface: The GroupApiCalls.ts contains one function for calling and handling (parsing handling to
 * middleware) GroupManagement functions. In a nutshell, it is the EXPRESS interface setup relaying calls to the
 * Mongoose backend in /Management/GroupManagement.ts
 */

const groupRoutes = express.Router();

groupRoutes.post('/create')
groupRoutes.post('/login')
groupRoutes.post('/join')
groupRoutes.post('/join_request')
groupRoutes.post('/accept_request')
groupRoutes.post('/update')
groupRoutes.post('/delete')
groupRoutes.get('/names')

export = groupRoutes