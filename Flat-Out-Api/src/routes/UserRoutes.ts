import express, {Request, Response, NextFunction} from "express";
import {userAutoLogin, userDelete, userLogin, userRegister, userUpdate} from "../management/UserManagement";
import {_routeHandler} from "./_routeHandlers";
import {extractJWT} from "../middleware/ExtractJWT";

/**
 * UserInterface: Not to be confused with a UI, the UserRoutes.ts contains one function for calling and handling
 * (parsing handling to middleware) UserManagement functions. In a nutshell, it is the EXPRESS interface setup,
 * relaying calls to the Mongoose backend in /management/UserManagement.ts
 */

const userRoutes = express.Router()

userRoutes.post('/register',
  (req: Request, res: Response, next: NextFunction) =>
    _routeHandler(userRegister(req.body), req, res, next))

userRoutes.post('/login',
  (req: Request, res: Response, next: NextFunction) =>
    _routeHandler(userLogin(req.body), req, res, next))

userRoutes.post('/auto-login', extractJWT,
  (req: Request, res: Response, next: NextFunction) =>
    _routeHandler(userAutoLogin(res.locals.jwt), req, res, next))

userRoutes.post('/update', extractJWT,
  (req: Request, res: Response, next: NextFunction) =>
    _routeHandler(userUpdate(res.locals.jwt, req.body), req, res, next))

userRoutes.post('/delete', extractJWT,
  (req: Request, res: Response, next: NextFunction) =>
    _routeHandler(userDelete(res.locals.jwt), req, res, next))

export = userRoutes
