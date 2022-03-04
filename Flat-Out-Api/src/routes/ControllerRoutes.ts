import express from "express";
import {routeHandler} from "../middleware/RouteHandler";
import {controllerRegister} from "../management/ControllerManagement";

export const controllerRoutes = express.Router()

controllerRoutes.post('/register', routeHandler(controllerRegister))
// controllerRoutes.post('/authenticate', routeHandler())
// controllerRoutes.post('/delete', routeHandler())
// controllerRoutes.post('/connect', extractInformation, routeHandler())