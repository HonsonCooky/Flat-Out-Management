import express from "express";
import {routeHandler} from "../middleware/RouteHandler";
import {extractJwt} from "../middleware/ExtractJwt";
import {componentConnect, componentRegister} from "../management/ComponentManagement";

export const componentRoutesBasic = express.Router({mergeParams: true})
export const componentRoutesPath = express.Router({mergeParams: true})

// Basic
componentRoutesBasic.post('/register', extractJwt, routeHandler(componentRegister))

// Path
componentRoutesPath.post('/connect', extractJwt, routeHandler(componentConnect))
