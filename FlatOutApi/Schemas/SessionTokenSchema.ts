import mongoose, {Schema} from "mongoose";
import {ReqSessionId} from "./_SchemaTypes";

export const SessionToken = new Schema({
  token: ReqSessionId,
  expiresAt: {type: Date, required:[true, "Tokens need some expiration"]}
})

export const SessionModel = mongoose.model("Sessions", SessionToken)