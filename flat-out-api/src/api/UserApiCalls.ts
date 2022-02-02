import express from "express";

/**
 * UserInterface: Not to be confused with a UI, the UserApiCalls.ts contains one function for calling and handling
 * (parsing handling to middleware) UserManagement functions. In a nutshell, it is the EXPRESS interface setup,
 * relaying calls to the Mongoose backend in /management/UserManagement.ts
 */

const userRoutes = express.Router()

userRoutes.post('/create')
userRoutes.post('/login')
userRoutes.post('/update')
userRoutes.post('/delete')

export = userRoutes
