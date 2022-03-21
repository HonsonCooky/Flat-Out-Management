import express from "express";
import {routeHandler} from "../middleware/RouteHandler";
import {tableRegister, tableUpdate} from "../management/TableManagement";
import {extractJwt} from "../middleware/ExtractJwt";
import {idRegExp} from "./UtilRouteValues";
import {componentDelete, componentGet} from "../management/GenericManagement";

export const tableRoutes = express.Router({mergeParams: true})

tableRoutes.post(`/register`, extractJwt(), routeHandler(tableRegister))
tableRoutes.get(`${idRegExp}/get`, extractJwt(), routeHandler(componentGet))
tableRoutes.post(`${idRegExp}/update`, extractJwt(), routeHandler(tableUpdate))
tableRoutes.delete(`${idRegExp}/delete`, extractJwt(), routeHandler(componentDelete))
