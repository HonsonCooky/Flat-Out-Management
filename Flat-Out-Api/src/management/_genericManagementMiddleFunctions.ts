import {
  BodyAuthContract,
  IDocModelAndRole,
  IFOMObject,
  IFomProtectDoc,
  JwtAuthContract
} from "../interfaces/_fomObjects";
import {ModelEnum} from "../interfaces/_enums";
import {compareHashes} from "./_authentication";
import _logger from "../config/_logger";
import {model, Model} from "mongoose";
import env from "../config/_envConfig";
import {IUser, UserModel} from "../schemas/UserSchema";

/** -----------------------------------------------------------------------------------------------------------------
 * MIDDLE FUNCTIONS:
 * The following functions are all generic implementations that remove duplicate code. For example, registering any
 * document (be it a User, Group or Table), each one will require that the body.docName is set to the document.docName.
 *
 * Each generic function returns the document that it has effected.
 -----------------------------------------------------------------------------------------------------------------*/

/**
 * MIDDLE REGISTER DOCUMENT: A middle function, that creates a document from the given model type and information
 * provided. It also checks that certain actions result in the anticipated action.
 * @param body {
 *   docName: string,
 *   uiName?: string,
 * }
 * @param type: ModelEnum
 */
export async function _middleRegisterDocument(body: BodyAuthContract, type: ModelEnum): Promise<IFOMObject> {
  _logger.info(`Attempting ${type} registration`)
  let docName = body.docName
  let uiName = body.uiName ? body.uiName : body.docName
  let fomVersion = env.version

  let docModel: Model<IFOMObject> = model<IFOMObject>(type)
  let doc = new docModel({docName, uiName, fomVersion})
  if (!doc) throw new Error(`400: Unable to create ${type}: ${docName}`)

  _logger.info(`Successfully created ${type}: ${doc.docName}`)
  return doc
}

/**
 * MIDDLE AUTH WITH BODY: A middle function that authenticates some password-protected document.
 * @param body {
 *   docName: string,
 *   password: string,
 * }
 * @param type
 */
export async function _middleAuthWithBody(body: BodyAuthContract, type: ModelEnum): Promise<IFomProtectDoc> {
  _logger.info(`Attempting ${type} authentication": Credentials`)

  const doc: IFomProtectDoc | null = await model(type).findOne({docName: body.docName})
  if (!doc) throw new Error(`400: Unable to find ${type} with credentials ${JSON.stringify(body)}`)
  if (!compareHashes(body.password, doc.password)) throw new Error(`400: Invalid password`)

  _logger.info(`Successfully authenticated ${type} "${doc.docName}": Credentials`)
  return doc;
}

/**
 * MIDDLE AUTH WITH JWT: Only user objects are encrypted with JWTs. As such, this function will find the user
 * associated with some JWT.
 * @see JwtAuthContract
 */
export async function _middleAuthWithJWT(jwt: JwtAuthContract): Promise<IUser> {
  let user: IUser | null = await UserModel.findOne({uuid: jwt.uuid})
  if (!user) throw new Error(`400: Invalid JWT. Login again`)
  return user
}

/**
 * MIDDLE AUTH ASSOCIATED: Authenticate that some object 'a' is connected to another 'other'. If it is, then the
 * 'other' document will be returned. This function is EXPENSIVE, but necessary for the user + association architecture.
 * @param a: Any IFOMObject, don't care how we get it.
 * @param b {
 *   association: BodyAuthContract,
 *   type: ModelEnum
 * }
 * @see BodyAuthContract
 * @see ModelEnum
 */
export async function _middleAuthAssociation(a: IFOMObject, b: { association: BodyAuthContract, type: ModelEnum }): Promise<IFOMObject> {
  if (!b.association.docName) throw new Error(`400: Invalid body structure. Missing association field`)
  let association = b.association.docName
  let password = b.association.password
  let type = b.type

  // First, check if 'a' is actually associated with the referenced document
  if (!a.associations.find((dmr: IDocModelAndRole) => dmr.doc.equals(association)))
    throw new Error(`400: Attempting to associate with unlinked value`)

  // Next, attempt to get the document (it may have been deleted)
  let doc: IFOMObject | null = await model<IFOMObject>(type).findOne({_id: association})

  // Invalid if doc doesn't exist OR (incorrect password && not associated)
  if (!doc ||
    ((password && "password" in doc && compareHashes(password, doc.password)) &&
      (!doc.associations.find((dmr: IDocModelAndRole) => dmr.doc.equals(a.docName))))
  ) {
    await a.update({associations: a.associations.filter((dmr: IDocModelAndRole) => !dmr.doc.equals(association))})
    throw new Error(`400: Invalid access permission. Item may be deleted`)
  }

  return doc
}
