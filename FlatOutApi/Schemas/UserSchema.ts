import mongoose, {Schema} from "mongoose";
import {GroupId, ListId, Name, Password, ReqUserId} from "./_SchemaTypes";
import {saltAndHash} from "../Util/Crypto";

/** ---------------------------------------------------------------------------------------------------------------
 * USER SCHEMA:
 * The User Schema is an aggregate of information on some user. The normal information is collected. Name, Email,
 * Password. Each user will be associated to some Group (their flat), and may contain several different lists. Groups
 * and Lists are associated by some identifying string. That string will find the Group/List in question.
 --------------------------------------------------------------------------------------------------------------- */
export const UserSchema = new Schema({
  id: ReqUserId,
  name: Name,
  password: Password,
  group: GroupId,
  groupsByAssociation: [GroupId],
  lists: [ListId],
  onLeave: [Date]
}, {timestamps: true})

UserSchema.pre('save', async function () {
  const user: any = this
  user.password = saltAndHash(user.password)
})

export const UserModel = mongoose.model("Users", UserSchema)
