import mongoose, {Schema} from "mongoose";
import {DateFromToday, GenerateEntityAndRole, GenerateId, Name, Password, Session} from "./_SchemaTypes";
import {ModelType} from "../Interfaces/UtilInterfaces";
import {User} from "../Interfaces/UserInterface";

/** ---------------------------------------------------------------------------------------------------------------
 * USER SCHEMA:
 * The User Schema is an aggregate of information on some user. The normal information is collected. Name, Email,
 * Password. Each user will be associated to some Group (their flat), and may contain several lists. Groups
 * and Lists are associated by some identifying string. That string will find the Group/List in question.
 --------------------------------------------------------------------------------------------------------------- */
const UserSchema = new Schema<User>({
  name: Name,
  password: Password,
  sessionToken: Session,
  groups: [GenerateEntityAndRole(ModelType.Groups)],
  lists: [GenerateId(ModelType.Lists)],
  onLeave: [DateFromToday]
}, {timestamps: true})

export const UserModel = mongoose.model<User>(ModelType.Users, UserSchema)
