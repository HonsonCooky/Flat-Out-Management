import {ModelEnum} from "../interfaces/GlobalEnums";
import {IDocModelAndRole, IFomNode} from "../interfaces/FomObjects";
import {compareHashes, saltAndHash} from "./0.AuthFuncs";
import {docRegister, docUpdate} from "./1.DocManagement";
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

/**
 * NODE UPDATE: Update the contents of a node.
 * @param doc
 * @param body
 */
export function nodeUpdate(doc: IFomNode, body: IDocModelAndRole | any): void {
  docUpdate(doc, body)
  doc.docName = body.docName ?? doc.docName
  doc.password = body.password ? saltAndHash(body.password) : doc.password
}

/**
 * NODE DELETE: Delete a node, disconnecting from all associations.
 * @param doc
 */
export async function nodeDelete(doc: IFomNode): Promise<void> {
  for (let dmr of doc.associations) {
    let association: IFomNode | null = await models[dmr.docModel].findOne({_id: dmr.doc})
    if (!association) continue

    association.associations = association.associations.filter((dmr: IDocModelAndRole) => !doc._id.equals(dmr.doc))
    await association.save()
  }

  doc.deleteOne()
}