import {Types} from "mongoose";

export class IFomAvatarMetaData {
  association?: Types.ObjectId
  validUntil: Date

  constructor(options: {association?: Types.ObjectId, validUntil: Date}) {
    this.association = options.association;
    this.validUntil = options.validUntil;
  }

  shouldDelete(): boolean {
    return !this.association && Date.now() > this.validUntil.getTime()
  }
}