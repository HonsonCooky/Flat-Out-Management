import mongoose, {Schema, Document} from "mongoose";
import {EntityRoleAndRefType, Id, Name} from "./_SchemaTypes";
import {ModelEnum} from "../Interfaces/_Enums";
import {Named, Linked, TimeStamped} from "../Interfaces/_FOMObjects";

/** ---------------------------------------------------------------------------------------------------------------
 * LIST SCHEMA:
 * The List Schema is a front for an array of items. Items (
 --------------------------------------------------------------------------------------------------------------- */
export interface Item extends Document, Named, Linked {
  desc: string
}

export interface List extends Document, Named, Linked, TimeStamped {
  items: Item[]
}


const Item = new Schema<Item>({
  name: Name,
  desc: String,
  associations: [EntityRoleAndRefType]
})

const ListSchema = new Schema<List>({
  name: Name,
  items: [Item],
  associations: [EntityRoleAndRefType]
}, {timestamps: true})

export const ListModel = mongoose.model<List>(ModelEnum.Lists, ListSchema)
