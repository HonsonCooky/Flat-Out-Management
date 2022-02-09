import {ModelEnum, RoleEnum, SearchOperator} from '../interfaces/_enums';
import {IFOMObject, IFOMProtectedNode} from '../interfaces/_fomObjects';
import {model, Types} from 'mongoose';
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

/**
 * SEARCH ASSOCIATIONS: IFOMObjects have a list of associations (rather than multiple individual lists). This
 * ensures that extensions in the future can easily be added.
 * @param obj: The document with associations to be searched
 * @param searchFilter: A recreation of IDocModelAndRole which enables each component to be optional
 * @param operand:
 */
export function searchAssociations(obj: IFOMObject,
                                   searchFilter: { doc?: Types.ObjectId, docModel?: ModelEnum, role?: RoleEnum},
                                   operand: SearchOperator = SearchOperator.AND) : IDocModelAndRole[] {
  return obj.associations.filter((dmr: IDocModelAndRole) => {
    switch (operand){

      // Defaults to true to ensure cases without parameters don't affect the search
      case SearchOperator.AND:
        return (searchFilter.doc ? searchFilter.doc.equals(dmr.doc) : true) &&
          (searchFilter.docModel ? searchFilter.docModel === dmr.docModel : true) &&
          (searchFilter.role ? searchFilter.role === dmr.role : true)

      // Defaults to false to ensure no false positives
      case SearchOperator.OR:
        return (searchFilter.doc ? searchFilter.doc.equals(dmr.doc) : false) ||
          (searchFilter.docModel ? searchFilter.docModel === dmr.docModel : false) ||
          (searchFilter.role ? searchFilter.role === dmr.role : false) ||
          // Edge case, where search filter is empty, but operand is set to OR
          (!searchFilter.doc && !searchFilter.docModel && !searchFilter.role)
    }
  })
}