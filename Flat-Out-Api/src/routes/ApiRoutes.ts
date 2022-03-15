import express from "express";
import {ModelEnum} from "../interfaces/FomEnums";
import {userRoutes} from "./UserRoutes";
import {groupRoutes} from "./GroupRoutes";
import {tableRoutes} from "./TableRoutes";

export const apiRoutes = express.Router({mergeParams: true})
export const idRegExp = '/:id([a-f0-9]{24})'

apiRoutes.use(`/api/:controller(${ModelEnum.USER})`, userRoutes)
apiRoutes.use(`/api/:component(${ModelEnum.GROUP})`, groupRoutes)
apiRoutes.use(`/api/:component(${ModelEnum.TABLE})`, tableRoutes)