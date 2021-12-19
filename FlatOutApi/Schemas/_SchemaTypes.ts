import {idValidator, nameValidator} from "./_Validators";
import {Tag} from "../Util/Constants";

export const missingStr = (item: string) => `Missing ${item}`

// Identifiers
const Id = {type: String, unique: true}
const ReqId = {...Id, required: [true, missingStr("ID")]}

export const UserId = {...Id, validate: idValidator(Tag.User)}
export const ReqUserId = {...UserId, ...ReqId}

export const GroupId = {...Id, validate: idValidator(Tag.Group)}
export const ReqGroupId = {...GroupId, ...ReqId}

export const ListId = {...Id, validate: idValidator(Tag.List)}
export const ReqListId = {...ListId, ...ReqId}

export const ItemId = {...Id, validate: idValidator(Tag.Item)}
export const ReqItemId = {...ItemId, ...ReqId}

// Names:
export const Name = {type: String, required: [true, missingStr('Name')], validate: nameValidator}
export const NameUni = {...Name, unique: true}

// Password: Not unique, else Hash+Salt doesn't work
export const Password = {type: String, required: [true, missingStr('Password')]}

// Authentication
export const GroupToken = {type: String, required: [true, missingStr('Group Token')], validate: idValidator(Tag.GroupToken)}
export const ListToken = {type: String, required: [true, missingStr('List Token')], validate: idValidator(Tag.ListToken)}

// Update
export interface Update {
  token: string, // Provided token to validate authentication to update
  update: {} // Will need to override with specific type
}