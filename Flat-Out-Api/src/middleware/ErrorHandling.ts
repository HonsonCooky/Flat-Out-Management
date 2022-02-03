import {ErrorRequestHandler} from "express";
import {IRes} from "../interfaces/_fomObjects";
import logger from "../config/Logging";


/** -----------------------------------------------------------------------------------------------------------------
 * EXPRESS ERROR HANDLER:
 * Error handler (express middleware) that sends error messages which can be directly displayed by the client.
 * This removes computation on the client side, as the information is already calculated here on the server side.
 ----------------------------------------------------------------------------------------------------------------- */

function jsonError(msg: string): IRes {
  return {msg: msg}
}

const known400ErrorMessages = [
  '400',
  'duplicate',
  'validation failed',
  'Cast to ObjectId failed'
]

export const errorHandler: ErrorRequestHandler = (err, req, res, _) => {
  let msg: string = err.message

  logger.error(msg, err)

  for (let i = 0; i < known400ErrorMessages.length; i++) if (msg.includes(known400ErrorMessages[i])) {
    res.status(400).send(jsonError(msg.replace(/400: /g, '')))
    return
  }

  res.status(500).send(jsonError(msg))
}
