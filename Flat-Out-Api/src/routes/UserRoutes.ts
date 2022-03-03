import express from "express";
import {routeHandler} from "../middleware/RouteHandler";
import {userAuthenticate, userDelete, userRegister} from "../management/UserManagement";
import {extractInformation} from "../middleware/ExtractInformation";

export const userRoutes = express.Router()

userRoutes.post('/register', routeHandler(userRegister))
userRoutes.post('/authenticate', routeHandler(userAuthenticate))
userRoutes.post('/delete', routeHandler(userDelete))
userRoutes.post('/connect', extractInformation, routeHandler(userDelete))