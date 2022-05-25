import {ObjectId, Types} from "mongoose";
import assert from "assert";

/**
 * A contract for GridFS avatar meta data images.
 */
export class AvatarMetaData {
  /**The exact moment, where this image can be deleted after (if not associated). <br/>Type: {@link Date}*/
  private readonly _expirationDate: Date
  /**An association to some {@link Document}. <br/>Type: {@link ObjectId?}*/
  private readonly _association?: Types.ObjectId

  constructor(expirationDate: Date, association?: Types.ObjectId) {
    this._expirationDate = expirationDate;
    this._association = association;
  }

  static from(options: any): AvatarMetaData {
    assert(options.expirationDate);
    return new AvatarMetaData(options.expirationDate, options.association)
  }

  /**
   * If this image is not being used (no association) and has gone stale (now > expire time), then the document should
   * be deleted from the MongoDB.
   */
  shouldDelete(): boolean {
    return !this._association && Date.now() > this._expirationDate.getTime()
  }
}