import express from "express";
import {routeHandler} from "../middleware/RouteHandler";
import {userDelete, userLogin, userRegister, userUpdate} from "../management/UserManagement";
import {extractJwt} from "../middleware/ExtractJwt";

export const userRoutes = express.Router({mergeParams: true})

userRoutes.post(`/register`, routeHandler(userRegister))
userRoutes.post(`/login`, routeHandler(userLogin))
userRoutes.post(`/delete`, routeHandler(userDelete))
userRoutes.post(`/update`, extractJwt(false), routeHandler(userUpdate))