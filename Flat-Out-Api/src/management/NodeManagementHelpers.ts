import {ModelEnum} from "../interfaces/GlobalEnums";
import {IDocModelAndRole, IFomNode} from "../interfaces/FomObjects";
import {compareHashes, saltAndHash} from "./AuthFuncs";
import {docRegister} from "./DocManagementHelpers";
import {models} from "mongoose";

/**
 * NODE REGISTER: Create a node document.
 * @param type
 * @param body
 */
export function nodeRegister(type: ModelEnum, body: any): IFomNode {
  let node = docRegister(type, body) as IFomNode
  node.docName = body.docName
  node.password = saltAndHash(body.password)
  node.associations = []
  return node
}

/**
 * NODE AUTH: Authenticate a node document.
 * @param type
 * @param body
 */
export async function nodeAuth(type: ModelEnum, body: IDocModelAndRole | any): Promise<IFomNode> {
  let doc: IFomNode | null = await models[type].findOne({$or: [{docName: body.docName}, {_id: body.doc}]})

  if (!doc)
    throw new Error(`400: Unable to find ${type}: Credentials`)
  if (!compareHashes(body.password ?? body.secret, doc.password))
    throw new Error(`400: Unable to authenticate ${type}`)

  return doc
}