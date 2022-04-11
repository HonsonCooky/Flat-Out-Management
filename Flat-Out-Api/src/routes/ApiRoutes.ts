import express from "express";
import {ModelType} from "flat-out-interfaces";
import {userRoutes} from "./UserRoutes";
import {groupRoutes} from "./GroupRoutes";
import {tableRoutes} from "./TableRoutes";


export const apiRoutes = express.Router({mergeParams: true})

apiRoutes.use(`/api/:controller(${ModelType.USER})`, userRoutes)
apiRoutes.use(`/api/:component(${ModelType.GROUP})`, groupRoutes)
apiRoutes.use(`/api/:component(${ModelType.TABLE})`, tableRoutes)