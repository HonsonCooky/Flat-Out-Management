import {ErrorRequestHandler} from "express";
import {addLogs} from "./Logging";

const known400ErrorMessages = [
  '400',
  'duplicate',
  'validation failed',
]

/** -----------------------------------------------------------------------------------------------------------------
 * EXPRESS ERROR HANDLER:
 * Error handler (express middleware) that sends error messages which can be directly displayed by the client.
 * This removes computation on the client side, as the information is already calculated here on the server side.
 ----------------------------------------------------------------------------------------------------------------- */
const jsonError = (msg: string) => {
  return {message: msg}
}

export const errorHandler: ErrorRequestHandler = (err, req, res, _) => {
  let msg: string = err.message

  addLogs(`${JSON.stringify(req.body)} ==> ${msg}`)

  for (let i = 0; i < known400ErrorMessages.length; i++) if (msg.includes(known400ErrorMessages[i])) {
    res.status(400).send(jsonError(msg.replace(/400: /g, '')))
    return
  }

  res.status(500).send(jsonError(msg))
}