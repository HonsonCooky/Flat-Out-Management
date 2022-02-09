import {ModelEnum} from '../interfaces/_enums';
import {IFOMProtectedNode} from '../interfaces/_fomObjects';
import {model} from 'mongoose';
import {compareHashes} from './_authentication';
import _logger from '../config/_logger';
import {IDocModelAndRole} from '../interfaces/_docRoleAndModel';

/**
 * GET DOC FROM BODY: Get a document using a username password combination
 * @param body {
 *   docName: string,
 *   password: string
 * }
 * @param type: ModelEnum
 */
export async function getDocFromBody(body: any, type: ModelEnum): Promise<IFOMProtectedNode> {
  const doc: IFOMProtectedNode | null = await model(type).findOne({docName: body.docName});
  if (!doc) throw new Error(`400: Unable to find ${type} with credentials ${JSON.stringify(body)}`);

  if (!compareHashes(body.password, doc.password)) throw new Error(`400: Invalid password`);

  _logger.info(`Successfully logged in ${type} "${doc._id}": Credentials`);

  return doc;
}

/**
 * GET DOC FROM JWT: Holding this JWT means you are you. So just grab the relevant document.
 * @param jwt: JWT Authentication Token
 * @param type: ModelEnum
 */
export async function getDocFromJWT(jwt: IDocModelAndRole, type: ModelEnum): Promise<IFOMProtectedNode> {
  const doc: IFOMProtectedNode | null = await model(type).findOne({uuid: jwt.doc});
  if (!doc) throw new Error(`400: Unable to find ${type} with uuid ${jwt.doc}. JWT token failed`);

  _logger.info(`Successfully logged in ${type} "${doc._id}": JWT`);

  return doc;
}
