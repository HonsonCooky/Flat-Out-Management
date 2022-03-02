import {ModelEnum, RoleEnum} from "../interfaces/GlobalEnums";
import {IDocModelAndRole, IFomComponent} from "../interfaces/FomObjects";
import {compareHashes, saltAndHash} from "./0.AuthFuncs";
import {models} from "mongoose";
import envConfig from "../config/EnvConfig";
import {handleAssociations, handleUpdate} from "./1.HelperFuncs";

/**
 * COMPONENT CREATE: Create a node document.
 * @param type
 * @param body
 */
export function componentCreate(type: ModelEnum, body: any): IFomComponent {
  return new models[type]({
    docName: body.docName,
    password: saltAndHash(body.password),
    uiName: body.uiName ?? body.docName,
    fomVersion: envConfig.version,
    readAuthLevel: body.readAuthLevel,
    writeAuthLevel: body.writeAuthLevel,
    associations: body.creator ? [{
      doc: body.creator,
      docModel: body.creatorModel,
      role: RoleEnum.ADMIN
    }] : []
  })
}

/**
 * COMPONENT AUTH: Authenticate a node document.
 * @param type
 * @param body
 */
export async function componentAuth(type: ModelEnum, body: any): Promise<IFomComponent> {
  let doc: IFomComponent | null = await models[type].findOne({$or: [{docName: body.docName}, {_id: body.doc}]})


  if (!doc)
    throw new Error(`400: Unable to find ${type}: Credentials`)
  if (!compareHashes(body.password, doc.password))
    throw new Error(`400: Unable to authenticate ${type}`)

  await handleAssociations(doc)

  return doc
}

/**
 * COMPONENT UPDATE: Update the contents of a node.
 * @param type
 * @param doc
 * @param body
 * @param informOthers
 */
export async function componentUpdate(type: ModelEnum, doc: IFomComponent, body: any, informOthers: boolean = false): Promise<void> {
  doc.docName = body.docName ?? doc.docName
  doc.password = body.password ? saltAndHash(body.password) : doc.password
  doc.uiName = body.uiName ?? doc.uiName
  doc.fomVersion = envConfig.version
  doc.readAuthLevel = body.readAuthLevel ?? doc.readAuthLevel
  doc.writeAuthLevel = body.writeAuthLevel ?? doc.writeAuthLevel
  await handleAssociations(doc)
  if (informOthers) await handleUpdate(type, doc)
}

/**
 * COMPONENT DELETE: Delete a node, disconnecting from all associations.
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