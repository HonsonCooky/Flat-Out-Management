import {ErrorRequestHandler, NextFunction, Request, Response} from "express";

import {FomRes} from "../interfaces/utils/FomRes";

const known400ErrorMessages = [
  '400',
  'duplicate',
  'validation failed',
  'expected rejection',
  'Cannot read properties of undefined'
]

function jsonError(msg: string): FomRes {
  return {
    msg: msg.replace(/400: /g, '')
      .replace(/500: /g, '')
      .replace('missing expected rejection: ', '')
      .replace(/Cannot read properties of undefined.*/g, 'Malformed API Request')
  }
}

/**
 * Express middleware component, allowing the function of the express app to simply throw an error
 * when necessary, which will be caught here. This will log the error, whilst also gently parsing the error back to
 * the client.
 * @param err
 * @param req
 * @param res
 * @param _
 */
export const errorHandler: ErrorRequestHandler = (err, req: Request, res: Response, _: NextFunction) => {
  let msg: string = err.message
  console.error(msg)

  if (known400ErrorMessages.some((eMsg: string) => msg.toLowerCase().includes(eMsg.toLowerCase()))) {
    res.status(400).send(jsonError(msg))
    return
  }

  res.status(500).send(jsonError(msg))
}
