import express from "express";
import {routeHandler} from "../middleware/RouteHandler";
import {userRegister} from "../management/UserManagement";

export const userRoutes = express.Router()

userRoutes.post('/register', routeHandler(userRegister))