import express from "express";
import {routeHandler} from "../middleware/RouteHandler";
import {groupRegister} from "../management/GroupManagement";

const groupRoutes = express.Router()

groupRoutes.post('/register', routeHandler(groupRegister))
// groupRoutes.post('/update', extractJwt, routeHandler(groupUpdate))

export = groupRoutes