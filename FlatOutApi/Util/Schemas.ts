import mongoose, {Schema} from "mongoose";

// Note: Some schemas may have associated interfaces. Unfortunately, mongoose does not provide a means of using the
// schema object as a type face. As such, alternative corresponding interfaces are created for typescript typing
// assurance.

/** ---------------------------------------------------------------------------------------------------------------
 * VALIDATORS:
 * Used to ensure that certain SchemaTypes are following certain guidelines.
 * NameValidator: Ensures names start with a character, and are 3-20 characters long.
 * EmailValidator: A basic regex that ensures emails entered are correctly typed.
 --------------------------------------------------------------------------------------------------------------- */
// NAME VALIDATOR
function nameValid(v: string) {
  return /^\S.{2,19}$/.test(v)
}

const nameValidator = [nameValid, "400:Names need to be 3-20 characters long; starting with a character"]

// EMAIL VALIDATOR
function emailValid(v: string) {
  return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v)
}

const emailValidator = [emailValid, "400:Email is incorrectly formatted"]

// ARRAY VALIDATOR WITH ONE ITEM
function arrayLengthValid(v: string[]) {
  return Array.isArray(v) && v.length > 0
}

const arrayLengthValidator = [arrayLengthValid, "400:Array is missing necessary contents"]

async function groupListIdUni(v: string) {
  let listIdCount = (await GroupModel.find({lists: {$elemMatch: {$eq: v}}})).length
  console.log(listIdCount, listIdCount  === 0)
  return listIdCount === 0
}

const arrayListsUnique = [groupListIdUni, "400:Array 'lists' contains an id that is associated to another group"]

// GROUP VALIDATOR
async function groupValid(v: string): Promise<boolean> {
  return GroupModel.countDocuments({groupName: v}, (err, count) => {
    return !err && count > 0
  })
}

const groupValidator = [groupValid, "400:Group listed does not exist"]

export interface Authenticator {
  identifier: string,
  password?: string
}

interface Update {
  auth: Authenticator
  update: null
}


/** ---------------------------------------------------------------------------------------------------------------
 * ITEM SCHEMA:
 * The Item Schema is one used to maintain a plethora of different objects. Every item will have a name, however,
 * use cases can vary with the lack, and ability of fields. A task can have a name, and associated user. A shopping
 * list item may have a name, associated group, and a number associated to it. This is a 'generic' object, at least,
 * as far as Mongoose will allow.
 --------------------------------------------------------------------------------------------------------------- */
export interface Item {
  itemName: string,
  itemDesc?: string,
  association?: string,
  multiplier?: number,
}

export type UpdateItem = Omit<Update, 'update'> & { update: Item }

const ItemSchema = new Schema({
  itemName: {type: String, required: [true, 'Items require a name'], validate: nameValidator},
  itemDesc: String,
  association: String,
  multiplier: Number,
})

/** ---------------------------------------------------------------------------------------------------------------
 * LIST SCHEMA:
 * The List Schema is a front for an array of items. However, it is used as a gate for an array of items. This gate
 * guards access to the list of items, enabling restricted access. Ultimately, this is not a vault for secret
 * information, but rather, a means of regulating client side accessible information. The key is generated once,
 * and held with a group or several users.
 --------------------------------------------------------------------------------------------------------------- */
export interface List {
  key: string,
  listName: string,
  listItems: Item[]
}

export type UpdateList = Omit<Update, 'update'> & { update: List }

const ListSchema = new Schema({
  key: {type: String, required: [true, 'Lists require a unique key'], unique: true, lowercase: true},
  listName: {type: String, required: [true, 'Lists require a name'], validate: nameValidator},
  listItems: {
    type: [ItemSchema],
    required: [true, 'Lists require a list... silly']
  }
}, {timestamps: true})

export const ListModel = mongoose.model("Lists", ListSchema)

/** ---------------------------------------------------------------------------------------------------------------
 * USER SCHEMA:
 * The User Schema is an aggregate of information on some user. The normal information is collected. Name, Email,
 * Password. Each user will be associated to some Group (their flat), and may contain several different lists. Groups
 * and Lists are associated by some identifying string. That string will find the Group/List in question.
 --------------------------------------------------------------------------------------------------------------- */

export interface User {
  email: string,
  username: string,
  password: string,
  nickname: string,
  group: string,
  lists: string[]
}

export type SanitizedUser = {
  email: string,
  username: string,
  nickname: string, // Is put into the database, so will be returned.
  group: string,
  lists: string[]
}

export type UpdateUser = Omit<Update, 'update'> & { update: User }

export const UserSchema = new Schema({
  email: {
    type: String,
    required: [true, 'Users require an email address'],
    unique: true,
    lowercase: true,
    validate: emailValidator
  },
  username: {type: String, required: [true, 'Users require a username'], unique: true, lowercase: true},
  // Password: Can't be unique, else two users can't have the same password hash+salt mix
  password: {type: String, required: [true, 'Users require a password']},
  // Nickname: The name which an application is likely to utilize. Doesn't need to be unique, but should be less
  // the 20 chars
  nickname: {type: String, required: [true, 'Users require a nickname'], validate: nameValidator},
  // Group: Can't be unique, multiple users can point to the same group. Is required, as the user cannot exist in
  // a flatting application, without an flat.
  group: {type: String, lowercase: true, validate: groupValidator},
  // Can't be unique, multiple users can point to the same lists
  lists: {
    type: [{type: String, lowercase: true}],
    required: [true, 'Users require AT LEAST an empty array to play with'],
  }
}, {timestamps: true})

export const UserModel = mongoose.model("Users", UserSchema)


/** ---------------------------------------------------------------------------------------------------------------
 * GROUP SCHEMA:
 * The Group Schema contains an object, which provides access to a group. Is its essence, a group is a hub. A central
 * location for all members of the group (flat). For this
 --------------------------------------------------------------------------------------------------------------- */

export interface Group {
  groupName: string,
  password: string,
  users: string[],
  lists: string[],
  chores: Item[],
  choresAutoFill: boolean,
  choresLoop: boolean,
  createdAt: string,
  updatedAt: string,
}

export type SanitizedGroup = {
  groupName: string,
  users: string[],
  lists: string[],
  chores: Item[],
  choresAutoFill: boolean,
  choresLoop: boolean,
  createdAt: string,
  updatedAt: string,
}


export type UpdateGroup = Omit<Update, 'update'> & { update: Group }

const GroupSchema = new Schema({
  groupName: {
    type: String,
    required: [true, 'Groups require a name'],
    unique: true,
    lowercase: true,
    validate: nameValidator
  },
  password: {type: String, required: [true, 'Groups require a password']},
  // A user can't be in more than one group
  users: {
    type: [{
      type: String,
      unique: true,
      lowercase: true,
    }],
    validate: arrayLengthValidator
  },
  // A group list cannot span across multiple groups
  lists: {
    type: [{
      type: String,
      lowercase: true,
      validate: arrayListsUnique
    }],
    required: [true, 'Groups require AT LEAST an empty list for other lists'],
  },
  chores: {
    type: [ItemSchema],
    required: [true, 'Groups require AT LEAST an empty list for chores'],
  },
  choresAutoFill: {type: Boolean, required: [true, 'Group needs to know whether to auto fill or not']},
  choresLoop: {type: Boolean, required: [true, 'Group needs to know whether to auto fill or not']}
}, {timestamps: true})

export const GroupModel = mongoose.model("Groups", GroupSchema)