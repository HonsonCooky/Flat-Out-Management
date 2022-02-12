import {model, Types} from "mongoose";
import {saltAndHash} from "./_authentication";
import {BodyAuthContract, IDocModelAndRole, IFOMObject, IFomProtectDoc, IRes} from "../interfaces/_fomObjects";
import {ModelEnum} from "../interfaces/_enums";
import _logger from "../config/_logger";
import {_middleAuthWithBody, _middleRegisterDocument} from "./_genericManagementMiddleFunctions";

/** -----------------------------------------------------------------------------------------------------------------
 * FULL FUNCTIONS:
 * The following functions are all generic implementations that remove duplicate code. For example, registering any
 * document (be it a User, Group or Table), each one will require the exact same actions.
 *
 * Each generic function returns an IRes which results from the action being taken.
 -----------------------------------------------------------------------------------------------------------------*/

/**
 * REGISTER DOCUMENT: An IRes wrapper for _middleRegisterDocument
 * @see _middleRegisterDocument
 */
export async function _registerDocument(body: BodyAuthContract, type: ModelEnum): Promise<IRes> {
  let doc: IFOMObject = await _middleRegisterDocument(body, type)
  await doc.save()
  return {
    msg: `Successfully registered ${type}: ${doc.docName}`
  }
}

/**
 * REGISTER PROTECTED DOCUMENT: An IRes wrapper for _middleRegisterDocument, with the added 'uuid' and 'password' field
 * being added to the registered document.
 *
 * body {
 *   ..._middleRegisterDocument.body,
 *   password: string
 * }
 *
 * @see _middleRegisterDocument
 */
export async function _registerProtectedDocument(body: any, type: ModelEnum): Promise<IRes> {
  // Start by registering the base document
  let doc: IFomProtectDoc = await _middleRegisterDocument(body, type) as IFomProtectDoc
  let uuid = new Types.ObjectId()
  let password = saltAndHash(body.password)

  doc.uuid = uuid
  doc.password = password

  await doc.save()

  _logger.info(`Successfully created protected ${type}: ${doc.docName}`)

  return {
    msg: `Successfully registered ${type}: ${doc.docName}`
  }
}


/**
 * REMOVE DOCUMENT FROM OTHERS: Disconnect some document from all associations (in preparation for document
 * deletion).
 * @param auth
 * @param type
 */
export async function _deleteDocument(auth: BodyAuthContract, type: ModelEnum): Promise<IRes> {
  let doc = await _middleAuthWithBody(auth as BodyAuthContract, type)

  for (let associate of doc.associations) {
    // Get the relevant document
    let aDoc: any = await model(associate.docModel).findOne({_id: associate.doc})
    if (!aDoc) continue

    // Update the document such that it doesn't have this id in it
    aDoc.associations = aDoc.associations.filter((a: IDocModelAndRole) => !a.doc.equals(doc._id))
    await aDoc.save()
  }

  await doc.deleteOne()

  return {
    msg: `Successfully deleted user ${doc.docName}`
  }
}