import express from "express";
import {routeHandler} from "../middleware/RouteHandler";
import {groupDelete, groupGet, groupRegister, groupUpdate} from "../management/GroupManagement";
import {extractJwt} from "../middleware/ExtractJwt";

export const groupRoutes = express.Router({mergeParams: true})

groupRoutes.post('/register', extractJwt(), routeHandler(groupRegister))
groupRoutes.get(`/:id/get`, extractJwt(), routeHandler(groupGet))
groupRoutes.post(`/:id/update`, extractJwt(), routeHandler(groupUpdate))
groupRoutes.post(`/:id/delete`, extractJwt(), routeHandler(groupDelete))