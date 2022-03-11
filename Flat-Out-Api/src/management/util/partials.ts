import {models, Types} from "mongoose";
import {IFomAssociation} from "../../interfaces/IFomAssociation";

export async function removeDocumentFromAssociations(doc: { _id: Types.ObjectId, [key: string]: any },
                                                     ...associations: IFomAssociation[]) {
  for (let a of associations) {
    let other: any = await models[a.model].findOne({_id: a.ref})
    if (!other) continue

    if (other.parents) await other.updateOne({
      parents: other.parents
        .filter((b: IFomAssociation) => !doc._id.equals(b.ref))
    })

    if (other.children) await other.updateOne({
      children: other.children
        .filter((b: IFomAssociation) => !doc._id.equals(b.ref))
    })
  }
}