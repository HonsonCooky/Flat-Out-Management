import {Document, ObjectId} from "mongoose";

/**
 * A contract for every database object in the Flat-Out Management backend application.
 */
export interface DbObject extends Document<ObjectId> {
  /**Explicitly state from {@link Document}. <br/>Type: {@link ObjectId}*/
  _id: ObjectId,
  /**Outlines the Flat-Out Management backend version that was used for this document. <br/>Type: {@link string}*/
  fomVersion: string,
  /**Explicitly stated from timestamped {@link Document}. <br/>Type: {@link Date}*/
  createdAt: Date,
  /**Explicitly stated from timestamped {@link Document}. <br/>Type: {@link Date}*/
  updatedAt: Date
}