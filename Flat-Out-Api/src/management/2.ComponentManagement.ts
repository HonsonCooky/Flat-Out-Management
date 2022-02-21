import {ModelEnum} from "../interfaces/GlobalEnums";
import {IDocModelAndRole, IFomComponent} from "../interfaces/FomObjects";
import {compareHashes, saltAndHash} from "./0.AuthFuncs";
import {models} from "mongoose";
import envConfig from "../config/EnvConfig";
import {handleAssociations} from "./1.HelperFuncs";

/**
 * NODE REGISTER: Create a node document.
 * @param type
 * @param body
 */
export function componentRegister(type: ModelEnum, body: any): IFomComponent {
  return new models[type]({
    docName: body.docName,
    password: saltAndHash(body.password),
    uiName: body.uiName ?? body.docName,
    fomVersion: envConfig.version,
    readAuthLevel: body.readAuthLevel,
    writeAuthLevel: body.writeAuthLevel
  })
}

/**
 * NODE AUTH: Authenticate a node document.
 * @param type
 * @param auth
 */
export async function componentAuth(type: ModelEnum, auth: any): Promise<IFomComponent> {
  let doc: IFomComponent | null = await models[type].findOne({$or: [{docName: auth.docName}, {_id: auth.doc}]})

  if (!doc)
    throw new Error(`400: Unable to find ${type}: Credentials`)
  if (!compareHashes(auth.password, doc.password))
    throw new Error(`400: Unable to authenticate ${type}`)

  await handleAssociations(doc)

  return doc
}

/**
 * NODE UPDATE: Update the contents of a node.
 * @param doc
 * @param body
 */
export async function componentUpdate(doc: IFomComponent, body: IDocModelAndRole | any): Promise<void> {
  doc.docName = body.docName ?? doc.docName
  doc.password = body.password ? saltAndHash(body.password) : doc.password
  doc.uiName = body.uiName ?? doc.uiName
  doc.fomVersion = envConfig.version
  doc.readAuthLevel = body.readAuthLevel ?? doc.readAuthLevel
  doc.writeAuthLevel = body.writeAuthLevel ?? doc.writeAuthLevel
  await handleAssociations(doc, true)
}

/**
 * NODE DELETE: Delete a node, disconnecting from all associations.
 * @param doc
 */
export async function componentDelete(doc: IFomComponent): Promise<void> {
  for (let dmr of doc.associations) {
    let association: IFomComponent | null = await models[dmr.docModel].findOne({_id: dmr.doc})
    if (!association) continue

    association.associations = association.associations.filter((dmr: IDocModelAndRole) => !doc._id.equals(dmr.doc))
    await association.save()
  }

  doc.deleteOne()
}