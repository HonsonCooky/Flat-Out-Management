import express from "express";
import {routeHandler} from "../middleware/RouteHandler";
import {controllerJwtAuth, controllerRegister, controllerUnamePassAuth} from "../management/ControllerManagement";
import {extractJwt} from "../middleware/ExtractJwt";

export const controllerRoutes = express.Router()

controllerRoutes.post('/register', routeHandler(controllerRegister))
controllerRoutes.post('/auth', routeHandler(controllerUnamePassAuth))
controllerRoutes.get('/jwt', extractJwt, routeHandler(controllerJwtAuth))
// controllerRoutes.post('/delete', routeHandler())
// controllerRoutes.post('/connect', extractJwt, routeHandler())