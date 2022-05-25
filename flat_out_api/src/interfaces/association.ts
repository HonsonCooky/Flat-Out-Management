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
  ref: ObjectId,
  model: ModelType
  role: RoleType
}