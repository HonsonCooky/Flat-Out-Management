import express, {Request, Response, NextFunction} from "express";
import {userLogin, userRegister, userUpdate} from "../management/UserManagement";
import {handleApiCall} from "./_routeHandlers";
import {extractJWT} from "../middleware/ExtractJWT";

/**
 * UserInterface: Not to be confused with a UI, the UserRoutes.ts contains one function for calling and handling
 * (parsing handling to middleware) UserManagement functions. In a nutshell, it is the EXPRESS interface setup,
 * relaying calls to the Mongoose backend in /management/UserManagement.ts
 */

const userRoutes = express.Router()

userRoutes.post('/register',
  (req: Request, res: Response, next: NextFunction) =>
    handleApiCall(userRegister(req.body), req, res, next))

userRoutes.post('/login',
  (req: Request, res: Response, next: NextFunction) =>
    handleApiCall(userLogin(req.body), req, res, next))

userRoutes.post('/update', extractJWT,
  (req: Request, res: Response, next: NextFunction) =>
    handleApiCall(userUpdate(res.locals.jwt, req.body), req, res, next))

userRoutes.post('/delete')

export = userRoutes
