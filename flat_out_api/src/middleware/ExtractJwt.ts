import {NextFunction, Request, Response} from "express";
import jwt from "jsonwebtoken";
import {CONFIG} from "../Config";

/**
 * An Express middleware component which will
 */
export function extractJwt(required: boolean = true) {
  return (req: Request, res: Response, next: NextFunction) => {
    let token = req.headers.authorization?.split(' ')[1]

    if (!token && required)
      throw new Error(`400: Request requires authorization`)
    else if (!token) {
      next()
      return
    }

    jwt.verify(token, CONFIG.token.secret, (err, decoded) => {
      if (err) throw new Error(`400: Access denied`)
      res.locals.jwt = decoded
      next()
    })
  }
}