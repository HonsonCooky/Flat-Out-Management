import {Tag} from "../Util/Constants";

export const missingStr = (item: string) => `Missing ${item}`

// Identifiers
const idValid = (key: string, v: string) => v.startsWith(key)
export const idValidator = (key: Tag) => [(v: string) => idValid(key, v), "Incorrect ID type"]

const Id = {type: String}
const ReqId = {required: [true, missingStr("Id")], unique: true}

export const UserId = {...Id, validate: idValidator(Tag.User)}
export const ReqUserId = {...UserId, ...ReqId}

export const GroupId = {...Id, validate: idValidator(Tag.Group)}
export const ReqGroupId = {...GroupId, ...ReqId}

export const ListId = {...Id, validate: idValidator(Tag.List)}
export const ReqListId = {...ListId, ...ReqId}

export const ItemId = {...Id, validate: idValidator(Tag.Item)}
export const ReqItemId = {...ItemId, ...ReqId}

// Names:
export const Name = {
  type: String,
  required: [true, missingStr('Name')],
  unique: true,
  minLength: 3,
  maxLength: 20,
  trim: true
}

// Password: Not unique, else Hash+Salt doesn't work
export const Password = {
  type: String,
  required: [true, missingStr('Password')]
}

// Roles: A level of authority for a user in a group
export const Role = {
  type: String,
  enum: ['admin', 'flatmate', 'associate'],
  default: 'associate'
}

// Default boolean to true
export const DefaultTrue = {
  type: Boolean,
  default: true,
}