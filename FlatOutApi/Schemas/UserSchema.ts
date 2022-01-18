import mongoose, {Schema} from "mongoose";
import {Id, Name, Password, Session} from "./_SchemaTypes";
import {checkUserIds} from "../Management/UserManagement";

/** ---------------------------------------------------------------------------------------------------------------
 * USER SCHEMA:
 * The User Schema is an aggregate of information on some user. The normal information is collected. Name, Email,
 * Password. Each user will be associated to some Group (their flat), and may contain several lists. Groups
 * and Lists are associated by some identifying string. That string will find the Group/List in question.
 --------------------------------------------------------------------------------------------------------------- */
export const UserSchema = new Schema({
  name: Name,
  password: Password,
  sessionToken: Session,
  groups: [Id],
  lists: [Id],
  onLeave: [Date]
}, {timestamps: true})

UserSchema.pre('save', async function () {
  const user = this;
  await checkUserIds(user)
})

export const UserModel = mongoose.model("Users", UserSchema)
