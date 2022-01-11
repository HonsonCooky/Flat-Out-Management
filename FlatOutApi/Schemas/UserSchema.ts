import mongoose, {Schema} from "mongoose";
import {Id, Name, Password, SchemaType, Session} from "./_SchemaTypes";
import {cleanDocumentConnections} from "../Util/IdChecks";

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

UserSchema.pre('save', async function(){
  await cleanDocumentConnections(this, SchemaType.User)
})

export const UserModel = mongoose.model("Users", UserSchema)
