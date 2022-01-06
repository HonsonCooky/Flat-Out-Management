import mongoose, {Schema} from "mongoose";
import {ListId, Password, ReqGroupId, ReqUserId, Session, UniName} from "./_SchemaTypes";
import {checkIds} from "../Management/_ManagementUtils";

/** ---------------------------------------------------------------------------------------------------------------
 * USER SCHEMA:
 * The User Schema is an aggregate of information on some user. The normal information is collected. Name, Email,
 * Password. Each user will be associated to some Group (their flat), and may contain several lists. Groups
 * and Lists are associated by some identifying string. That string will find the Group/List in question.
 --------------------------------------------------------------------------------------------------------------- */
export const UserSchema = new Schema({
  id: ReqUserId,
  sessionToken: Session,
  name: UniName,
  password: Password,
  groups: [ReqGroupId],
  lists: [ListId],
  onLeave: [Date]
}, {timestamps: true})

UserSchema.pre('save', async function(){
  let user: any = this
  await checkIds([...user.groups, ...user.lists])
})

export const UserModel = mongoose.model("Users", UserSchema)
