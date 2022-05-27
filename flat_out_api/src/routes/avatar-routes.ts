import express from "express";

export const avatarRoutes = express.Router({mergeParams: true})

// let storage = multer.memoryStorage()
// let upload = multer({storage})

// avatarRoutes.post(`/upload`,
//   extractJwt(false),
//   upload.single('avatar'),
//   routeHandler(uploadAvatar))
//
// avatarRoutes.delete(`/delete`,
//   extractJwt(),
//   routeHandler(deleteAvatar))
//
// avatarRoutes.get(`/get/:avatarId`,
//   extractJwt(),
//   downloadAvatar)