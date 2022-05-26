import {ObjectId, Types} from "mongoose";
import assert from "assert";

export interface AvatarMetaData {
  /**The exact moment, where this image can be deleted after (if not associated). <br/>Type: {@link Date}*/
  expirationDate: Date
  /**An association to some {@link Document}. <br/>Type: {@link ObjectId?}*/
  association?: Types.ObjectId
}

/**
 * A contract for GridFS image metadata.
 * NOTE: This is
 */
export class AvatarMetaDataImpl implements AvatarMetaData {
  /**The exact moment, where this image can be deleted after (if not associated). <br/>Type: {@link Date}*/
  expirationDate: Date
  /**An association to some {@link Document}. <br/>Type: {@link ObjectId?}*/
  association?: Types.ObjectId

  constructor(expirationDate: Date, association?: Types.ObjectId) {
    this.expirationDate = expirationDate;
    this.association = association;
  }

  /**
   * A static constructor for JSON objects.
   * @param options
   */
  static from(options: any): AvatarMetaDataImpl {
    assert(options.expirationDate);
    return new AvatarMetaDataImpl(options.expirationDate, options.association)
  }

  /**
   * If this image is not being used (no association) and has gone stale (now > expire time), then the document should
   * be deleted from the MongoDB.
   */
  shouldDelete(): boolean {
    return !this.association && Date.now() > this.expirationDate.getTime()
  }
}