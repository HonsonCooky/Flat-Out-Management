import express from "express";
import {routeHandler} from "../middleware/RouteHandler";
import {groupDelete, groupGet, groupRegister, groupUpdate} from "../management/GroupManagement";
import {extractJwt} from "../middleware/ExtractJwt";
import {idRegExp} from "./ApiRoutes";

export const groupRoutes = express.Router({mergeParams: true})

groupRoutes.post('/register', extractJwt(), routeHandler(groupRegister))
groupRoutes.get(`${idRegExp}/get`, extractJwt(), routeHandler(groupGet))
groupRoutes.post(`${idRegExp}/update`, extractJwt(), routeHandler(groupUpdate))
groupRoutes.post(`${idRegExp}/delete`, extractJwt(), routeHandler(groupDelete))