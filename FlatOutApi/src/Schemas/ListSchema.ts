import mongoose, {Schema} from "mongoose";
import {Id, Name} from "./_SchemaTypes";
import {cleanIds} from "./_IdChecker";
import {ModelType} from "../_Interfaces";

/** ---------------------------------------------------------------------------------------------------------------
 * LIST SCHEMA:
 * The List Schema is a front for an array of items. Items (
 --------------------------------------------------------------------------------------------------------------- */
export const Item = new Schema({
  name: Name,
  desc: String,
  mentions: [Id(ModelType.Users) || Id(ModelType.Groups)]
})

const ListSchema = new Schema({
  name: Name,
  associations: [Id(ModelType.Users) || Id(ModelType.Groups)],
  items: [Item]
}, {timestamps: true})

ListSchema.pre('save', () => cleanIds(this, ModelType.Lists))

export const ListModel = mongoose.model(ModelType.Lists, ListSchema)
