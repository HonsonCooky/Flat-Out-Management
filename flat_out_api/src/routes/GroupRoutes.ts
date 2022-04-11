import express from "express";
import {routeHandler} from "../middleware/RouteHandler";
import {groupRegister, groupUpdate} from "../management/GroupManagement";
import {extractJwt} from "../middleware/ExtractJwt";
import {idRegExp} from "./UtilRouteValues";
import {componentDelete, componentGet} from "../management/GenericManagement";

export const groupRoutes = express.Router({mergeParams: true})

groupRoutes.post('/register', extractJwt(), routeHandler(groupRegister))
groupRoutes.get(`${idRegExp}/get`, extractJwt(), routeHandler(componentGet))
groupRoutes.post(`${idRegExp}/update`, extractJwt(), routeHandler(groupUpdate))
groupRoutes.delete(`${idRegExp}/delete`, extractJwt(), routeHandler(componentDelete))