import express from "express";
import {avatarRoutes} from "./avatar-routes";

export const apiRoutes = express.Router({mergeParams: true})

// apiRoutes.use(`/api/:controller(${ModelType.USER})`, userRoutes)
// apiRoutes.use(`/api/:component(${ModelType.GROUP})`, groupRoutes)
// apiRoutes.use(`/api/:component(${ModelType.TABLE})`, tableRoutes)
apiRoutes.use(`/api/avatar`, avatarRoutes)