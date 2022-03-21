import express from "express";
import {ModelEnum} from "../../../Flat-Out-Interfaces/interfaces/FomEnums";
import {userRoutes} from "./UserRoutes";
import {groupRoutes} from "./GroupRoutes";
import {tableRoutes} from "./TableRoutes";


export const apiRoutes = express.Router({mergeParams: true})

apiRoutes.use(`/api/:controller(${ModelEnum.USER})`, userRoutes)
apiRoutes.use(`/api/:component(${ModelEnum.GROUP})`, groupRoutes)
apiRoutes.use(`/api/:component(${ModelEnum.TABLE})`, tableRoutes)