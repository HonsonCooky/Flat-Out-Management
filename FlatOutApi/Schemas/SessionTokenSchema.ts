import mongoose, {Schema} from "mongoose";
import {ReqSessionId} from "./_SchemaTypes";

export const SessionToken = new Schema({
  id: ReqSessionId,
  expires: {type: Date, required: true}
})

export const SessionModel = mongoose.model("Sessions", SessionToken)