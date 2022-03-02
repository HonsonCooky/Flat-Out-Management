import {NextFunction, Request, Response} from "express";
import jwt from "jsonwebtoken";
import env from "../config/EnvConfig";

export const extractInformation = (req: Request, res: Response, next: NextFunction) => {
  let token = req.headers.authorization?.split(' ')[1]
  if (token) res.locals.jwt = jwt.verify(token, env.token.secret)

  res.locals.controller = req.headers.controller
  res.locals.component = req.headers.component

  next()
}