import {IFOMObject, IFOMProtectedNode, JWTPayload} from "../interfaces/_fomObjects";
import {ModelEnum} from "../interfaces/_enums";
import {getDocFromJWT} from "./_genericHelperFunctions";
import {saltAndHash} from "./_authentication";
import _logger from "../config/_logger";

/**
 * MIDDLE UPDATE: Get the document and update the contents which every document will have. This is a MIDDLEWARE
 * which does not need to be replicated everywhere.
 * @param body {
 *   docName?: string,
 *   uiName?: string
 * }
 * @param jwt: JWT Authentication Token
 * @param type: ModelEnum
 */
export async function _middleUpdate(jwt: JWTPayload, body: any, type: ModelEnum): Promise<IFOMObject> {
  _logger.info(`Attempting ${type} update`)
  let doc: IFOMProtectedNode = await getDocFromJWT(jwt, type)

  doc.docName = body.docName ? body.docName : doc.docName
  doc.uiName = body.uiName ? body.uiName : doc.uiName

  return doc
}
/**
 * MIDDLE PROTECTED UPDATE: Get the document and update the contents which every document will have. This is a
 * MIDDLEWARE
 * which does not need to be replicated everywhere.
 * @param body {
 *    ..._middleUpdate,
 *    password?: string
 * }
 * @param jwt: JWT Authentication Token
 * @param type: ModelEnum
 */
export async function _middleProtectedUpdate(jwt: JWTPayload, body: any, type: ModelEnum): Promise<IFOMProtectedNode> {
  _logger.info(`Attempting ${type} protected update`)
  let doc: IFOMObject = await _middleUpdate(jwt, body, type)
  if (!('password' in doc)) throw new Error(`500: Attempted protected update on non-protected document`)

  doc.password = body.password ? saltAndHash(body.password) : doc.password

  return doc
}