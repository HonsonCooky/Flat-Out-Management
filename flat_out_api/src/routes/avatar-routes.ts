import express from "express";
import {extractJwt} from "../middleware/extract-jwt";
import {routeHandler} from "../middleware/route-handler";
import multer from "multer";
import {deleteAvatar, downloadAvatar, uploadAvatar} from "../management/avatar-management";

export const avatarRoutes = express.Router({mergeParams: true})

let storage = multer.memoryStorage()
let upload = multer({storage})

avatarRoutes.post(`/upload`,
  extractJwt(),
  express.urlencoded({extended: true}), // For Multipart/Form-Data
  upload.single('avatar'), // Multer upload into memory storage (use once, and forget)
  routeHandler(uploadAvatar))

avatarRoutes.delete(`/delete`,
  extractJwt(),
  routeHandler(deleteAvatar))

avatarRoutes.get(`/get/:avatarId`,
  extractJwt(),
  downloadAvatar)