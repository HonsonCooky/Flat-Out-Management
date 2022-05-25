import {routeHandler} from "../middleware/route-handler";
import {deleteAvatar, downloadAvatar, uploadAvatar} from "../management/AvatarManagement";
import express from "express";
import multer from "multer";
import {extractJwt} from "../middleware/extract-jwt";

export const avatarRoutes = express.Router({mergeParams: true})

let storage = multer.memoryStorage()
let upload = multer({storage})

avatarRoutes.post(`/upload`,
  extractJwt(false),
  upload.single('avatar'),
  routeHandler(uploadAvatar))

avatarRoutes.delete(`/delete`,
  extractJwt(),
  routeHandler(deleteAvatar))

avatarRoutes.get(`/get/:avatarId`,
  extractJwt(),
  downloadAvatar)