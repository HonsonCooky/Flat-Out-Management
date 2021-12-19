import {Schema} from "mongoose";
import {Name, ReqUserId, Update, UserId} from "./SchemaTypes";


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
  associations?: string[],
}

export type UpdateItem = Omit<Update, 'update'> & { update: Item }

export const ItemSchema = new Schema({
  itemName: Name,
  itemDesc: String,
  multiplier: Number,
  associations: [UserId],
}, {timestamps: true})

/** ---------------------------------------------------------------------------------------------------------------
 * GAME SCHEMA:
 * The Game Schema is used to maintain and track different scores on different games. A flat the plays together,
 * stays united.
 --------------------------------------------------------------------------------------------------------------- */

export interface Score {
  user: string,
  value?: string,
}

export type UpdateScore = Omit<Update, 'update'> & {update: Score}

const ScoreSchema = new Schema({
  user: ReqUserId,
  value: String,
}, {timestamps: true})

export interface Game {
  gameName: string,
  gameDesc?: string,
  scoreboard: [Score]
}

export type UpdateGame = Omit<Update, "update"> & {update: Game}

export const GameSchema = new Schema({
  gameName: Name,
  gameDesc: String,
  scoreboard: [ScoreSchema]
}, {timestamps: true})