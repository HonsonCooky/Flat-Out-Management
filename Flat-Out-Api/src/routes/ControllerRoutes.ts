import express from "express";
import {routeHandler} from "../middleware/RouteHandler";
import {
  controllerDelete,
  controllerJwtAuth,
  controllerRegister,
  controllerUnamePassAuth,
  controllerUpdateMajor,
  controllerUpdateMinor
} from "../management/ControllerManagement";
import {extractJwt} from "../middleware/ExtractJwt";
import {env} from "../config/EnvConfig";
import {componentRoutesBasic, componentRoutesPath} from "./ComponentRoutes";

export const controllerRoutes = express.Router({mergeParams: true})

// Username + password
controllerRoutes.post('/register', routeHandler(controllerRegister))
controllerRoutes.post('/auth', routeHandler(controllerUnamePassAuth))
controllerRoutes.post('/delete', routeHandler(controllerDelete))
controllerRoutes.post('/update/major', routeHandler(controllerUpdateMajor))

// JWT
controllerRoutes.get('/jwt', extractJwt, routeHandler(controllerJwtAuth))
controllerRoutes.post('/update/minor', extractJwt, routeHandler(controllerUpdateMinor))

// Component
controllerRoutes.use(`/:component${env.urlRegExp.componentTypeRegExp}`, componentRoutesBasic)
controllerRoutes.use(`(/:component${env.urlRegExp.componentTypeRegExp}/:id)+`, componentRoutesPath)