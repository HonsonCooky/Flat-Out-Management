import express from "express";
import {ModelEnum} from "../interfaces/FomEnums";
import {userRoutes} from "./UserRoutes";

export const apiRoutes = express.Router({mergeParams: true})

apiRoutes.use(`/api/${ModelEnum.USER}`, userRoutes)