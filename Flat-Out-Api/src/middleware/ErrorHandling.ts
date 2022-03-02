import {ErrorRequestHandler, NextFunction, Request, Response} from "express";
import {IFomRes} from "../interfaces/IFomRes";
import {fomLogger} from "../config/Logger";

const known400ErrorMessages = [
  '400',
  'duplicate',
  'validation failed'
]

function jsonError(msg: string): IFomRes {
  return {msg: msg.replace(/400: /g, '').replace(/500: /g, '')}
}

/**
 * ERROR HANDLER: Express middleware component, allowing the function of the express app to simply throw an error
 * when necessary, which will be caught here. This will log the error, whilst also gently parsing the error back to
 * the client.
 * @param err
 * @param req
 * @param res
 * @param _
 */
export const errorHandler: ErrorRequestHandler = (err, req: Request, res: Response, _: NextFunction) => {
  let msg: string = err.message

  if (known400ErrorMessages.some((eMsg: string) => eMsg.includes(msg))) {
    fomLogger.warn(msg, err)
    res.status(400).send(jsonError(msg))
    return
  }

  fomLogger.error(msg, err)
  res.status(500).send(jsonError(msg))
}
