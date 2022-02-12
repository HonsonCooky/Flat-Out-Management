import express, {NextFunction, Request, Response} from "express";
import {userLogin} from "../management/UserManagement";
import {_routeHandler} from "./_routeHandlers";
import {_registerProtectedDocument} from "../management/_genericManagementFullFunctions";
import {ModelEnum} from "../interfaces/_enums";
import {extractJWT} from "../middleware/ExtractJWT";

/**
 * UserInterface: Not to be confused with a UI, the UserRoutes.ts contains one function for calling and handling
 * (parsing handling to middleware) UserManagement functions. In a nutshell, it is the EXPRESS interface setup,
 * relaying calls to the Mongoose backend in /management/UserManagement.ts
 */

const userRoutes = express.Router()

// GENERIC -------------------------------------------------------------------------
userRoutes.post('/register',
  (req: Request, res: Response, next: NextFunction) =>
    _routeHandler(_registerProtectedDocument(req.body, ModelEnum.USER), res, next))

userRoutes.post('/login',
  (req: Request, res: Response, next: NextFunction) =>
    _routeHandler(userLogin(req.body), res, next))

userRoutes.post('/auto-login', extractJWT,
  (req: Request, res: Response, next: NextFunction) =>
    _routeHandler(userLogin(res.locals.jwt), res, next))

userRoutes.post('/delete')

// UNIQUE -------------------------------------------------------------------------

userRoutes.post('/update')

export = userRoutes
