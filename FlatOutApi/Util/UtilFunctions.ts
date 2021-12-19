import bcrypt from 'bcryptjs'
import mongoose from "mongoose";
import {ErrorRequestHandler} from "express";
import {randomUUID} from "crypto";
import {Tag} from "./Constants";

/**
 * This file contains global objects and helper functions which are reasonably generic and self explanatory.
 */

/** -----------------------------------------------------------------------------------------------------------------
 * LOGS:
 * Logs are used to maintain some information about the current session. Holding this information can provide some
 * insight into the state of the running instance. For example, if the MongoDB connection is ready, or if certain
 * errors exist. Naturally, this information is only held on the server whist it runs. For this use case, a 30 min
 * timeout should erase all information without a stack overflow. Granted, this is used lightly.
 ----------------------------------------------------------------------------------------------------------------- */
let sessionLogs: string[] = []
export const getLogs = () => {
  return [...sessionLogs]
}
export const addLogs = (...logs: string[]) => {
  sessionLogs = sessionLogs.concat(logs)
}
export const isDbConnected = () => {
  return mongoose.connection.readyState === 1
}

/** -----------------------------------------------------------------------------------------------------------------
 * CRYPTO:
 * Crypto functions to provide some UUID, hashing and salting, also validation of hashes.
 ----------------------------------------------------------------------------------------------------------------- */
export function saltAndHash(input: string): string {
  return bcrypt.hashSync(input, bcrypt.genSaltSync())
}

export function compareHashes(nonHash: string, hash: string): boolean {
  return bcrypt.compareSync(nonHash, hash)
}

export function generateIdWithTag(tag: Tag): string {
  return tag + "-" + randomUUID()
}

/** -----------------------------------------------------------------------------------------------------------------
 * EXPRESS ERROR HANDLER:
 * Error handler (express middleware) that sends error messages which can be directly displayed by the client.
 * This removes computation on the client side, as the information is already calculated here on the server side.
 ----------------------------------------------------------------------------------------------------------------- */
export const errorHandler: ErrorRequestHandler = (err, req, res, _) => {
  let msg: string = err.message
  addLogs(`${JSON.stringify(req.body)} ==> ${msg}`)
  if (msg.startsWith('400') || msg.startsWith('Validation failed')) res.status(400).send({
    message: `${msg.replace(/400:|.*validation failed: /g, '')}`
  })
  else if (msg.startsWith('500')) res.status(500).send({
    message: `${msg.replace(/500:/g, '')}`
  })
  else if (msg.includes('duplicate')) res.status(400).send({
    message: `Unfortunately, a document with these credentials already exists.`
  })
  else if (err) {
    res.status(500).send({
      message: "Opps! I don't know what happened *shrugs*. Whatever you tried to do, didn't work. Try again?"
    })
  }
}