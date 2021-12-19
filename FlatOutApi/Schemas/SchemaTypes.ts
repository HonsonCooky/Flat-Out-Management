import {idValidator, nameValidator} from "./Validators";

export const missingStr = (item: string) => `400:Missing ${item}`

// Identifiers
const Id = {type: String, unique: true}
const ReqId = {...Id, required: [true, missingStr("ID")]}

export const UserId = {...Id, validate: idValidator('U')}
export const ReqUserId = {...UserId, ...ReqId}

export const GroupId = {...Id, validate: idValidator('G')}
export const ReqGroupId = {...GroupId, ...ReqId}

export const ListId = {...Id, validate: idValidator('L')}
export const ReqListId = {...ListId, ...ReqId}

// Names:
export const Name = {type: String, required: [true, missingStr('Name')], validate: nameValidator}
export const NameUni = {...Name, unique: true}

// Password: Not unique, else Hash+Salt doesn't work
export const Password = {type: String, required: [true, missingStr('Password')]}

// Authentication
export const GroupToken = {type: String, required: [true, missingStr('Group Token')], validate: idValidator('GT')}
export const ListToken = {type: String, required: [true, missingStr('List Token')], validate: idValidator('LT')}

// Update
export interface Update {
  token: string, // Provided token to validate authentication to update
  update: {} // Will need to override with specific type
}