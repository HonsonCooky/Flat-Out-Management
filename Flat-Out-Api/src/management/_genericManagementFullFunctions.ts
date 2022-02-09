import logger from "../config/Logging";
import {saltAndHash, signJWT} from "./_authentication";
import {Model, model, Types} from "mongoose";
import {IFOMObject, IFOMProtectedNode, IRes, JWTPayload} from "../interfaces/_fomObjects";
import {ModelEnum} from "../interfaces/_enums";
import {IDocModelAndRole} from "../interfaces/_docRoleAndModel";
import envConfig from "../config/EnvrionmentConfig";
import {getDocFromBody, getDocFromJWT} from "./_genericHelperFunctions";


/**
 * REGISTER DOCUMENT: Create a document from the provided information
 * @param body {
 *   docName: string,
 *   uiName?: string,
 * }
 * @param type: ModelEnum
 * @param save: False IFF this is a protected document (code reuse)
 */
export async function _registerDocument(body: any, type: ModelEnum, save: boolean = true): Promise<IRes | IFOMProtectedNode> {
  logger.info(`Attempting ${type} registration`)
  let docName = body.docName
  let uiName = body.uiName
  let fomVersion = envConfig.fomVersion

  let docModel: Model<IFOMObject> = model<IFOMObject>(type)
  let doc = new docModel({docName, uiName, fomVersion})
  if (!doc) throw new Error(`400: Unable to create ${type}: ${docName}`)

  if (!save) return doc as IFOMProtectedNode

  await doc.save()

  logger.info(`Successfully created ${type}: ${doc._id}`)

  return {
    msg: `Successfully registered ${type}: ${docName}`
  }
}

/**
 * REGISTER PROTECTED DOCUMENT: Create a PROTECTED document from the provided information
 * @param body {
 *   ..._registerDocument,
 *   password: string
 * }
 * @param type: ModelEnum
 */
export async function _registerProtectedDocument(body: any, type: ModelEnum): Promise<IRes> {
  // Start by registering the base document
  let doc: IRes | IFOMProtectedNode = await _registerDocument(body, type, false)
  if ('msg' in doc) throw new Error(`500: Register document returned IRes. Expected IFomObject`)

  let uuid = new Types.ObjectId()
  let password = saltAndHash(body.password)

  doc.uuid = uuid
  doc.password = password

  await doc.save()

  logger.info(`Successfully created protected ${type}: ${doc._id}`)

  return {
    msg: `Successfully registered ${type}: ${doc.docName}`
  }
}

/**
 * LOGIN PROTECTED DOCUMENT: If a document is protected. Then registering won't
 * @param body {
 *   docName: string,
 *   password: string
 * }
 * @param type: ModelEnum
 */
export async function _loginProtectedDocument(body: any, type: ModelEnum): Promise<IRes>{
  logger.info(`Attempting ${type} login: Credentials`)

  let doc = await getDocFromBody(body, type)
  doc.uuid = new Types.ObjectId()
  await doc.save()

  let token = signJWT(doc)

  logger.info(`Successfully logged in ${type}: ${doc._id}`)

  return {
    msg: `Successfully logged in ${type}: ${doc.uiName}`,
    item: doc,
    token: 'Bearer ' + token
  }
}

/**
 * AUTO LOGIN PROTECTED DOCUMENT: If a document is protected. Then registering won't
 * @param jwt: JWT Authentication Token
 * @param type: ModelEnum
 */
export async function _autoLoginProtectedDocument(jwt: JWTPayload, type: ModelEnum): Promise<IRes>{
  logger.info(`Attempting ${type} login: JWT`)
  let doc = await getDocFromJWT(jwt, type)
  return {
    msg: `Successfully logged in ${type}: ${doc.uiName}`,
    item: doc
  }
}

/**
 * DELETE: Delete some document, removing all references from connected items.
 * @param jwt
 * @param type
 */
export async function _deleteDocument(jwt: JWTPayload, type: ModelEnum): Promise<IRes> {
  logger.info(`Finding user to delete`)
  let doc = await getDocFromJWT(jwt, type)

  // Disconnect from others
  for (let associate of doc.associations) {
    // Get the relevant document
    let aDoc: any = await model(associate.docModel).findOne({_id: associate.doc})
    if (!aDoc) continue

    // Update the document such that it doesn't have this id in it
    aDoc.associations = aDoc.associations.filter((a: IDocModelAndRole) => !doc?._id?.equals(a.doc))
    await aDoc.updateOne()
  }

  await doc.deleteOne()

  return {
    msg: `Successfully deleted user ${doc._id}`
  }
}
