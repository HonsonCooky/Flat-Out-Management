import express from "express";
import {routeHandler} from "../middleware/RouteHandler";
import {tableRegister} from "../management/TableManagement";
import {extractJwt} from "../middleware/ExtractJwt";

export const tableRoutes = express.Router({mergeParams: true})

tableRoutes.post(`/register`, extractJwt(), routeHandler(tableRegister))
