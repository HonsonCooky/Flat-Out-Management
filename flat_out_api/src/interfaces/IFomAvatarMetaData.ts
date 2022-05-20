import {Types} from "mongoose";

export interface IFomMetaDataOptions {
  association?: Types.ObjectId,
  validUntil: Date
}

export class IFomAvatarMetaData {
  association?: Types.ObjectId
  validUntil: Date

  constructor(options: IFomMetaDataOptions) {
    this.association = options.association;
    this.validUntil = options.validUntil;
  }

  shouldDelete(): boolean {
    return !this.association && Date.now() > this.validUntil.getTime()
  }

  static shouldDelete(options: IFomMetaDataOptions){
    return new IFomAvatarMetaData(options).shouldDelete()
  }
}