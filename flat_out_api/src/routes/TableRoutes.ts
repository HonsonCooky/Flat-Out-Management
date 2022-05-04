import express from "express";
import {routeHandler} from "../middleware/RouteHandler";
import {tableRegister, tableShare, tableUpdate} from "../management/TableManagement";
import {extractJwt} from "../middleware/ExtractJwt";
import {idRegExp} from "./UtilRouteValues";
import {componentDelete, componentGet} from "../management/GenericManagement";

export const tableRoutes = express.Router({mergeParams: true})

tableRoutes.post(`/register`, extractJwt(), routeHandler(tableRegister))
tableRoutes.post(`${idRegExp}/get`, extractJwt(), routeHandler(componentGet))
tableRoutes.post(`${idRegExp}/share`, extractJwt(), routeHandler(tableShare))
tableRoutes.post(`${idRegExp}/update`, extractJwt(), routeHandler(tableUpdate))
tableRoutes.delete(`${idRegExp}/delete`, extractJwt(), routeHandler(componentDelete))
