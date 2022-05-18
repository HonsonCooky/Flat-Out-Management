import {routeHandler} from "../middleware/RouteHandler";
import {getAvatars, uploadAvatar} from "../management/AvatarManagement";
import express from "express";
import multer from "multer";

export const avatarRoutes = express.Router({mergeParams: true})
avatarRoutes.post(`/upload`, multer({storage: multer.memoryStorage()}).single('avatar'),
  routeHandler(uploadAvatar))
avatarRoutes.get(`/get`, routeHandler(getAvatars))