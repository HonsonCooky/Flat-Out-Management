import express, {NextFunction, Request, Response} from "express";
import {userLogin, userUpdate} from "../management/UserManagement";
import {_routeHandler} from "./_routeHandlers";
import {extractJWT} from "../middleware/ExtractJWT";
import {
  _autoLoginProtectedDocument,
  _deleteDocument,
  _registerProtectedDocument
} from "../management/_genericManagementFullFunctions";
import {ModelEnum} from "../interfaces/_enums";

/**
 * UserInterface: Not to be confused with a UI, the UserRoutes.ts contains one function for calling and handling
 * (parsing handling to middleware) UserManagement functions. In a nutshell, it is the EXPRESS interface setup,
 * relaying calls to the Mongoose backend in /management/UserManagement.ts
 */

const userRoutes = express.Router()

// GENERIC -------------------------------------------------------------------------
userRoutes.post('/register',
  (req: Request, res: Response, next: NextFunction) =>
    _routeHandler(_registerProtectedDocument(req.body, ModelEnum.User), res, next))

userRoutes.post('/auto-login', extractJWT,
  (req: Request, res: Response, next: NextFunction) =>
    _routeHandler(_autoLoginProtectedDocument(res.locals.jwt, ModelEnum.User), res, next))

userRoutes.post('/delete', extractJWT,
  (req: Request, res: Response, next: NextFunction) =>
    _routeHandler(_deleteDocument(res.locals.jwt, ModelEnum.User), res, next))

// UNIQUE -------------------------------------------------------------------------
userRoutes.post('/login',
  (req: Request, res: Response, next: NextFunction) =>
    _routeHandler(userLogin(req.body), res, next))

userRoutes.post('/update', extractJWT,
  (req: Request, res: Response, next: NextFunction) =>
    _routeHandler(userUpdate(res.locals.jwt, req.body), res, next))

export = userRoutes
