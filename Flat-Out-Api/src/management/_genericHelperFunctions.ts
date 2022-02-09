import {ModelEnum} from "../interfaces/_enums";
import {IFOMProtectedNode, JWTPayload} from "../interfaces/_fomObjects";
import {model} from "mongoose";
import {compareHashes} from "./_authentication";
import logger from "../config/Logging";

export async function getDocFromBody(body: any, type: ModelEnum): Promise<IFOMProtectedNode> {
  let doc: IFOMProtectedNode | null = await model(type).findOne({docName: body.docName})
  if (!doc) throw new Error(`400: Unable to find ${type} with credentials ${JSON.stringify(body)}`)

  if (!compareHashes(body.password, doc.password)) throw new Error(`400: Invalid password`)

  logger.info(`Successfully logged in ${type}: ${doc._id}: Credentials`)

  return doc
}

export async function getDocFromJWT(jwt: JWTPayload, type: ModelEnum): Promise<IFOMProtectedNode> {
  let doc: IFOMProtectedNode | null = await model(type).findOne({uuid: jwt.uuid})
  if (!doc) throw new Error(`400: Unable to ${type} user with uuid ${jwt.uuid}. JWT token failed`)

  logger.info(`Successfully logged in ${type}: ${doc._id}: JWT`)

  return doc
}