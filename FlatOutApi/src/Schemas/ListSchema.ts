import mongoose, {Schema} from "mongoose";
import {GenerateId, Name} from "./_SchemaTypes";
import {ModelType} from "../Interfaces/UtilInterfaces";
import {Item, List} from "../Interfaces/ListInterface";

/** ---------------------------------------------------------------------------------------------------------------
 * LIST SCHEMA:
 * The List Schema is a front for an array of items. Items (
 --------------------------------------------------------------------------------------------------------------- */
const Item = new Schema<Item>({
  name: Name,
  desc: String,
  associations: [GenerateId(ModelType.Users) || GenerateId(ModelType.Groups)]
})

const ListSchema = new Schema<List>({
  name: Name,
  associations: [GenerateId(ModelType.Users) || GenerateId(ModelType.Groups)],
  items: [Item]
}, {timestamps: true})

export const ListModel = mongoose.model<List>(ModelType.Lists, ListSchema)
