import {routeHandler} from "../middleware/RouteHandler";
import {getAvatar, uploadAvatar} from "../management/AvatarManagement";
import express from "express";
import multer from "multer";
import {extractJwt} from "../middleware/ExtractJwt";

export const avatarRoutes = express.Router({mergeParams: true})

let storage = multer.memoryStorage()
let upload = multer({storage})

avatarRoutes.post(`/upload`,
  extractJwt(false),
  upload.single('avatar'),
  routeHandler(uploadAvatar))

avatarRoutes.get(`/get/:avatarId`, extractJwt(), getAvatar)