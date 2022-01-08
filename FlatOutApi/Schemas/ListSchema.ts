import mongoose, {Schema} from "mongoose";
import {Id, Name} from "./_SchemaTypes";
import {checkIds} from "../Util/IdChecks";
import {ItemModel} from "./ItemSchema";

/** ---------------------------------------------------------------------------------------------------------------
 * LIST SCHEMA:
 * The List Schema is a front for an array of items. Items (
 --------------------------------------------------------------------------------------------------------------- */
const ListSchema = new Schema({
  name: Name,
  items: [Id]
}, {timestamps: true})

ListSchema.pre('save', async function (){
  const list: any = this
  await checkIds(ItemModel, ...list.items)
})

export const ListModel = mongoose.model("Lists", ListSchema)
