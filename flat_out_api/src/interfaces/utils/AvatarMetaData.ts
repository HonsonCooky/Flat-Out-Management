import {ObjectId} from "mongoose";
import assert from "assert";

/**
 * A contract for GridFS avatar meta data images.
 */
export class AvatarMetaData {
  /**An association to some {@link Document}. <br/>Type: {@link ObjectId?}*/
  association?: ObjectId
  /**The exact moment, where this image can be deleted after (if not associated). <br/>Type: {@link Date}*/
  expirationDate: Date

  constructor(options: any) {
    assert(options.validUntil);
    this.association = options.association;
    this.expirationDate = options.validUntil;
  }

  /**
   * Helper method to allow on-the-fly detection of image deletion.
   * @param options Some object that represents an {@link AvatarMetaData}
   */
  static shouldDelete(options: any) {
    return new AvatarMetaData(options).shouldDelete()
  }

  /**
   * If this image is not being used (no association) and has gone stale (now > expire time), then the document should
   * be deleted from the MongoDB.
   */
  shouldDelete(): boolean {
    return !this.association && Date.now() > this.expirationDate.getTime()
  }
}