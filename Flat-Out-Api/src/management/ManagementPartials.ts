import {ModelEnum} from "../interfaces/FomEnums";
import {IFomDocument} from "../interfaces/IFomDocument";
import {models} from "mongoose";
import {compareHashes, saltAndHash} from "./AuthPartials";
import {env} from "../config/EnvConfig";
import {IFomAssociation} from "../interfaces/IFomAssociation";


/**
 * DOCUMENT REGISTER: Create some document from the body of a request.
 * @param type
 * @param body
 */
export async function documentRegister(type: ModelEnum, body: any): Promise<IFomDocument> {
  return new models[type]({
    name: body.name,
    nickname: body.name,
    password: body.password ? saltAndHash(body.password) : "",
    fomVersion: env.version
  })
}

/**
 * DOCUMENT AUTHENTICATE: Authenticate that some username + password combination is valid
 * @param type
 * @param body
 */
export async function documentAuthenticate(type: ModelEnum, body: any): Promise<IFomDocument> {
  let document: IFomDocument = await models[type].findOne({name: body.name}) as IFomDocument
  if (!document) throw new Error(`400: Unable to find user ${body.name}`)
  if (document.password && document.password.length > 0 && !compareHashes(body.password, document.password))
    throw new Error(`400: Invalid password`)

  return document
}

/**
 * DOCUMENT DELETE: Remove a document, and remove it from all associations as well.
 * @param type
 * @param body
 */
export async function documentDelete(type: ModelEnum, body: any): Promise<IFomDocument> {
  let document: IFomDocument = await documentAuthenticate(type, body)
  for (let val of document.associations) {
    let association: IFomDocument = await models[val.model].findOne({_id: val.ref}) as IFomDocument
    if (!association) continue

    association.associations = association.associations.filter((val: IFomAssociation) => !val.ref.equals(document._id))
    await association.save()
  }

  document.deleteOne()
  return document
}