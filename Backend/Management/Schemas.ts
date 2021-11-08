import mongoose, {Schema} from "mongoose";


/**
 * Schema Types
 */
const strReq = {type: String, required: true}
const numReq = {type: Number, required: true}

/**
 * User Schema
 */
export const User = new Schema({
    userid: strReq,
    username: strReq,
    email: strReq,

})

export const userSet = mongoose.model("userSets", User)