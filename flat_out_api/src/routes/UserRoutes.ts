import express from "express";
import {routeHandler} from "../middleware/RouteHandler";
import {userDelete, userGet, userRegister, userSearch, userUpdate} from "../management/UserManagement";
import {extractJwt} from "../middleware/ExtractJwt";

export const userRoutes = express.Router({mergeParams: true})

userRoutes.post(`/register`, routeHandler(userRegister))
userRoutes.post(`/get`, routeHandler(userGet))
userRoutes.delete(`/delete`, routeHandler(userDelete))
userRoutes.get(`/search`, extractJwt(), routeHandler(userSearch))
userRoutes.post(`/update`, extractJwt(), routeHandler(userUpdate))
