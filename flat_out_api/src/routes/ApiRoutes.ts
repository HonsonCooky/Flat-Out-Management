import express from "express";
import {userRoutes} from "./UserRoutes";
import {groupRoutes} from "./GroupRoutes";
import {tableRoutes} from "./TableRoutes";
import {ModelType} from "../interfaces/IFomEnums";
import {avatarRoutes} from "./AvatarRoutes";

export const apiRoutes = express.Router({mergeParams: true})

apiRoutes.use(`/api/:controller(${ModelType.USER})`, userRoutes)
apiRoutes.use(`/api/:component(${ModelType.GROUP})`, groupRoutes)
apiRoutes.use(`/api/:component(${ModelType.TABLE})`, tableRoutes)
apiRoutes.use(`/api/avatar`, avatarRoutes)