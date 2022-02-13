import {NextFunction, Request, Response} from "express";
import jwt from "jsonwebtoken";
import env from "../config/EnvConfig";
import _logger from "../config/Logger";

export = (req: Request, res: Response, next: NextFunction) => {
  _logger.info('Validating Token')

  let token = req.headers.authorization?.split(' ')[1]
  if (!token) throw new Error(`400: Unauthorized access to command`)

  jwt.verify(token, env.token.secret, (err, decoded) => {
    if (err) throw new Error(`400: Invalid token authentication`)
    res.locals.jwt = decoded
    next()
  })
}