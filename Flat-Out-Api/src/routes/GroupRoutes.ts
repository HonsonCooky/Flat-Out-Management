import express, {NextFunction, Request, Response} from 'express';
import {_routeHandler} from './_routeHandlers';
import {
  _autoLoginProtectedDocument,
  _deleteDocument,
  _registerProtectedDocument,
} from '../management/_genericManagementFullFunctions';
import {ModelEnum} from '../interfaces/_enums';
import {extractJWT} from '../middleware/ExtractJWT';
import {groupJoin} from '../management/GroupManagement';


/**
 * GroupInterface: The GroupRoutes.ts contains one function for calling and handling (parsing handling to
 * middleware) GroupManagement functions. In a nutshell, it is the EXPRESS interface setup relaying calls to the
 * Mongoose backend in /management/GroupManagement.ts
 */

const groupRoutes = express.Router();

// GENERIC --------------------------------------------------------------------
groupRoutes.post('/register',
  (req: Request, res: Response, next: NextFunction) =>
    _routeHandler(_registerProtectedDocument(req.body, ModelEnum.GROUP), res, next))

groupRoutes.post('/auto-login',
  (req: Request, res: Response, next: NextFunction) =>
    _routeHandler(_autoLoginProtectedDocument(res.locals.jwt, ModelEnum.GROUP), res, next))

groupRoutes.post('/delete',
  (req: Request, res: Response, next: NextFunction) =>
    _routeHandler(_deleteDocument(res.locals.jwt, ModelEnum.GROUP), res, next))

// UNIQUE ---------------------------------------------------------------------
groupRoutes.post('/join', extractJWT,
  (req: Request, res: Response, next: NextFunction) =>
    _routeHandler(groupJoin(res.locals.jwt, req.body), res, next))

groupRoutes.post('/join_request')
groupRoutes.post('/accept_request')
groupRoutes.post('/update')
groupRoutes.get('/names')

export = groupRoutes
