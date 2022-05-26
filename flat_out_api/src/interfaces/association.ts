import {ObjectId} from "mongoose";

/**
 * Outlines the different types of MongoDB documents.
 */
export enum ModelType {
  USER = 'user',
  GROUP = 'group',
  TABLE = 'table',
  CALENDAR = 'calendar'
}

/**
 * Outlines the different roles that can connect some document to another.
 */
export enum RoleType {
  WRITER = 'writer',
  READER = 'reader',
  REQUEST = 'request',
}

/**
 * A tuple that connects some id to it's MongoDB model, and a role. Those holding an association, are connected to some
 * other MongoDB document, where the connection type is of 'role'.
 */
export interface Association {
  /**The _id associated with some document*/
  ref: ObjectId,
  /**The model type of the _id*/
  model: ModelType,
  /**The connection type between the object holding this {@link Association}, and the {@link ref}*/
  role: RoleType,
  /**A string representation of the {@link ref}. Used on the frontend*/
  value: string,
}