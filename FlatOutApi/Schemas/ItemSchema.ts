import mongoose, {Schema} from "mongoose";
import {Id, Name} from "./_SchemaTypes";

/** ---------------------------------------------------------------------------------------------------------------
 * ITEM SCHEMA:
 * The Item Schema is one used to maintain a plethora of different objects. Every item will have a 'name', although
 * this 'name' can be used for different things. Chores, game scores, reminders, shopping items. Essentially, this
 * volatile object aims to fill many shoes, to reduce the static nature of Schema objects.
 *
 * This is essentially, a datalake
 --------------------------------------------------------------------------------------------------------------- */
const ItemSchema = new Schema({
  name: Name,
  desc: String,
  value: Number,
  multiplier: Number,
  associations: [Id]
}, {timestamps: true})

export const ItemModel = mongoose.model("Items", ItemSchema)