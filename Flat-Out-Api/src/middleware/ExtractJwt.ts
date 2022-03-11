import {NextFunction, Request, Response} from "express";
import jwt from "jsonwebtoken";
import {env} from "../config/Config";

/**
 * EXTRACT INFORMATION: An Express middleware component which will
 * @param req
 * @param res
 * @param next
 */
export const extractJwt = (req: Request, res: Response, next: NextFunction) => {
  let token = req.headers.authorization?.split(' ')[1]
  if (!token) throw new Error(`400: Request requires authorization`)
  jwt.verify(token, env.token.secret, (err, decoded) => {
    if (err) throw new Error(`400: Access denied`)
    res.locals.jwt = decoded
    next()
  })
}