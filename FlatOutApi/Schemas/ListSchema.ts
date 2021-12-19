import mongoose, {Schema} from "mongoose";
import {Item, ItemSchema} from "./ChildSchemas";
import {ListId, Name, Update} from "./SchemaTypes";

/** ---------------------------------------------------------------------------------------------------------------
 * LIST SCHEMA:
 * The List Schema is a front for an array of items. However, it is used as a gate for an array of items. This gate
 * guards access to the list of items, enabling restricted access. Ultimately, this is not a vault for secret
 * information, but rather, a means of regulating client side accessible information. The key is generated once,
 * and held with a group or several users.
 --------------------------------------------------------------------------------------------------------------- */
export interface List {
  id: string,
  listName: string,
  listItems?: Item[]
}

export type UpdateList = Omit<Update, 'update'> & { update: List }

const ListSchema = new Schema({
  id: ListId,
  listName: Name,
  listItems: [ItemSchema]
}, {timestamps: true})

export const ListModel = mongoose.model("Lists", ListSchema)
