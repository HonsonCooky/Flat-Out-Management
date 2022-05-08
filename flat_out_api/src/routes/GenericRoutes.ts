import express from "express";
import {modelRegExp} from "./UtilRouteValues";
import {routeHandler} from "../middleware/RouteHandler";
import {componentUpdateAvatar} from "../management/GenericManagement";
import {extractJwt} from "../middleware/ExtractJwt";

export const genericRoutes = express.Router({mergeParams: true})

genericRoutes.post(`/avatar-update${modelRegExp}`, extractJwt(), routeHandler(componentUpdateAvatar))