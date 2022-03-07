import express from "express";
import {routeHandler} from "../middleware/RouteHandler";
import {
  controllerDelete,
  controllerJwtAuth,
  controllerRegister,
  controllerUnamePassAuth, controllerUpdateMinor, controllerUpdateMajor, controllerConnect
} from "../management/ControllerManagement";
import {extractJwt} from "../middleware/ExtractJwt";
import {env} from "../config/EnvConfig";

export const controllerRoutes = express.Router()

// Username + password
controllerRoutes.post('/register', routeHandler(controllerRegister))
controllerRoutes.post('/auth', routeHandler(controllerUnamePassAuth))
controllerRoutes.post('/delete', routeHandler(controllerDelete))
controllerRoutes.post('/update/major', routeHandler(controllerUpdateMajor))

// JWT
controllerRoutes.get('/jwt', extractJwt, routeHandler(controllerJwtAuth))
controllerRoutes.post('/update/minor', extractJwt, routeHandler(controllerUpdateMinor))
controllerRoutes.post(`/connect${env.url.typeAndId}`, extractJwt, routeHandler(controllerConnect))