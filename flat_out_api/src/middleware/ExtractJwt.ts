import {NextFunction, Request, Response} from "express";
import jwt from "jsonwebtoken";
import {env} from "../config/Config";

/**
 * An Express middleware component which will
 * @param required
 */
export function extractJwt(required: boolean = true) {
  return (req: Request, res: Response, next: NextFunction) => {
    let token = req.headers.authorization?.split(' ')[1]

    if (!token) {
      if (required) throw new Error(`400: Request requires authorization`)
      else {
        next()
        return
      }
    }

    jwt.verify(token, env.token.secret, (err, decoded) => {
      if (err) throw new Error(`400: Access denied`)
      res.locals.jwt = decoded
      next()
    })
  }
}