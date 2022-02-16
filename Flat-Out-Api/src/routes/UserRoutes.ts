import express from "express";
import {routeHandler} from "../middleware/RouteHandler";
import {userAuth, userDelete, userRegister, userUpdate} from "../management/UserManagement";
import extractJwt from "../middleware/ExtractJWT"

const userRoutes = express.Router()

userRoutes.post('/register', routeHandler(userRegister))
userRoutes.post('/auth', extractJwt, routeHandler(userAuth))
userRoutes.post('/update', extractJwt, routeHandler(userUpdate))
userRoutes.post('/delete', routeHandler(userDelete))

export = userRoutes