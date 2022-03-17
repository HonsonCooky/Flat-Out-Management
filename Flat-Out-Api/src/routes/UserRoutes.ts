import express from "express";
import {routeHandler} from "../middleware/RouteHandler";
import {userDelete, userGet, userRegister, userUpdate} from "../management/UserManagement";
import {extractJwt} from "../middleware/ExtractJwt";

export const userRoutes = express.Router({mergeParams: true})

userRoutes.get(`/get`, routeHandler(userGet))
userRoutes.post(`/register`, routeHandler(userRegister))
userRoutes.post(`/delete`, routeHandler(userDelete))
userRoutes.post(`/update`, extractJwt(false), routeHandler(userUpdate))