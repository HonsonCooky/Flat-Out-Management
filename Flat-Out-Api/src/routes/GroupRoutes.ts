import express from "express";
import {routeHandler} from "../middleware/RouteHandler";

export const groupRoutes = express.Router({mergeParams: true})

groupRoutes.post('register', routeHandler)