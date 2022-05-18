import {Types} from "mongoose";

export class IFomAvatarMetaData {
  association?: Types.ObjectId
  createdAt: Date
  updatedAt: Date

  constructor(association?: Types.ObjectId) {
    this.association = association
    this.createdAt = new Date()
    this.updatedAt = new Date()
  }

}