import {Schema} from "mongoose";
import {nameValidator, Update} from "./Validators";


/** ---------------------------------------------------------------------------------------------------------------
 * ITEM SCHEMA:
 * The Item Schema is one used to maintain a plethora of different objects. Every item will have a name, however,
 * use cases can vary with the lack, and ability of fields. A task can have a name, and associated user. A shopping
 * list item may have a name, associated group, and a number associated to it. This is a 'generic' object, at least,
 * as far as Mongoose will allow.
 --------------------------------------------------------------------------------------------------------------- */
export interface Item {
  itemName: string,
  itemDesc?: string,
  multiplier?: number,
}

export type updateItem = Omit<Update, 'update'> & { update: Item }

export const ItemSchema = new Schema({
  uid: {type: String, required: [true, 'Item requires a UUID'], unique: true},
  itemName: {type: String, required: [true, 'Items require a name'], validate: nameValidator},
  itemDesc: String,
  multiplier: Number,
})