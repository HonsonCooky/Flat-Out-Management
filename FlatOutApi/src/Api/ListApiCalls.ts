import express from "express";

/**
 * ListInterface: The ListApiCalls.ts contains one function for calling and handling (parsing handling to
 * middleware) ListManagement functions. In a nutshell, it is the EXPRESS interface setup relaying calls to the
 * Mongoose backend in /Management/ListManagement.ts
 */

const listRoutes = express.Router()

listRoutes.post('/create')
listRoutes.post('/connect')
listRoutes.post('/addItem')
listRoutes.post('/removeItem')
listRoutes.post('/delete')

export = listRoutes