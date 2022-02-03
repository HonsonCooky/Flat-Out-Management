import {NextFunction, Request, Response} from "express";
import logger from "../config/Logging";
import * as jwt from "jsonwebtoken";
import envConfig from "../config/EnvrionmentConfig";

function extractJWT(req: Request, res: Response, next: NextFunction) {
  logger.info('Validating Token')
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) throw new Error(`400: Unauthorized access to command`)

  jwt.verify(token, envConfig.token.secret, (err, decoded) => {
    if (err) throw new Error(`400: Invalid token authentication`)
    res.locals.jwt = decoded
    next()
  })
}