import express from "express";
import {ModelEnum} from "../interfaces/FomEnums";
import {userRoutes} from "./UserRoutes";
import {groupRoutes} from "./GroupRoutes";

export const apiRoutes = express.Router({mergeParams: true})

apiRoutes.use(`/api/${ModelEnum.USER}`, userRoutes)
apiRoutes.use(`/api/${ModelEnum.GROUP}`, groupRoutes)