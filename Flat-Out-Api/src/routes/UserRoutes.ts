import express from "express";
import {routeHandler} from "../middleware/RouteHandler";
import {userAuth, userRegister} from "../management/UserManagement";
import extractJwt from "../middleware/ExtractJWT"

const userRoutes = express.Router()

userRoutes.post('/register', routeHandler(userRegister))
userRoutes.post('/auth', extractJwt, routeHandler(userAuth))

export = userRoutes