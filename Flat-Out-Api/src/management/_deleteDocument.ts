import {IFOMCollectionDocument} from "../interfaces/_fomObjects";
import {DocRoleAndModel} from "../interfaces/_docRoleAndModel";
import {connection} from "mongoose";

export async function _deleteDocument(document: IFOMCollectionDocument){
  for (let associate of document.associations){
    // Get the relevant document
    let aDoc: any = await connection.db.collection(associate.docModel).findOne({_id: associate.doc})
    if (!aDoc) continue
    aDoc.associations = aDoc.associations.filter((a: DocRoleAndModel) => !document._id?.equals(a.doc))
    await aDoc.save()
  }
  document.deleteOne()
}