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
function nameValidator(v: string) {
    return /^\S.{2,19}$/.test(v)
}

const customNameValidator = [nameValidator, "'Name is too long - too short - or doesn't start with a character"]

function emailValidator(v: string) {
    return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v)
}

const customEmailValidator = [emailValidator, "Email is not formatted correctly"]


/** ---------------------------------------------------------------------------------------------------------------
 * ITEM SCHEMA:
 * The Item Schema is one used to maintain a plethora of different objects. Every item will have a name, however,
 * use cases can vary with the lack, and ability of fields. A task can have a name, and associated user. A shopping
 * list item may have a name, associated group, and a number associated to it. This is a 'generic' object, at least,
 * as far as Mongoose will allow.
 --------------------------------------------------------------------------------------------------------------- */
const ItemSchema = new Schema({
    key: {type: String, required: [true, 'Items require a name'], unique: true, lowercase: true},
    itemName: {type: String, required: [true, 'Items require a name'], validate: customNameValidator},
    itemDesc: String,
    association: {type: String, validate: customNameValidator},
    multiplier: Number,
})

/** ---------------------------------------------------------------------------------------------------------------
 * LIST SCHEMA:
 * The List Schema is a front for an array of items. However, it is used as a gate for an array of items. This gate
 * guards access to the list of items, enabling restricted access. Ultimately, this is not a vault for secret
 * information, but rather, a means of regulating client side accessible information. The key is generated once,
 * and held with a group or several users.
 --------------------------------------------------------------------------------------------------------------- */
const ListSchema = new Schema({
    key: {type: String, required: [true, 'Lists require a unique key'], unique: true, lowercase: true},
    listName: {type: String, required: [true, 'Lists require a name'], validate: customNameValidator},
    association: [{type: String, required: [true, 'List associations require a name'], lowercase: true}],
    listItems: [ItemSchema]
}, {timestamps: true})

export const ListModel = mongoose.model("Lists", ListSchema)

/**
 * USER SCHEMA:
 * The User Schema is an aggregate of information on some user. The normal information is collected. Name, Email,
 * Password. Each user will be associated to some Group (their flat), and may contain several different lists. Groups
 * and Lists are associated by some identifying string. That string will find the Group/List in question.
 */

export interface User extends Document {
    email: string,
    username: string,
    username_lower: string,
    password: string,
    nickname: string,
    group: string,
    lists: string[]
}

export interface SanitizedUser {
    email: string,
    username: string,
    nickname: string, // Is put into the database, so will be returned.
    group: string,
    lists: string[]
}

export interface AuthenticationUser {
    identifier: string,
    password: string
}

export interface UpdateUser {
    auth: AuthenticationUser,
    update: User
}

export const UserSchema = new Schema({
    email: {
        type: String,
        required: [true, 'Users require an email address'],
        unique: true,
        lowercase: true,
        validate: customEmailValidator
    },
    username: {type: String, required: [true, 'Users require a name'], unique: true, lowercase: true},
    // Password: Can't be unique, else two users can't have the same password hash+salt mix
    password: {type: String, required: [true, 'Users require a password']},
    // Nickname: The name which an application is likely to utilize. Doesn't need to be unique, but should be less
    // the 20 chars
    nickname: {type: String, required: [true, 'Users require a nickname'], validate: customNameValidator},
    // Group: Can't be unique, multiple users can point to the same group. Is required, as the user cannot exist in
    // a flatting application, without an flat.
    group: {type: String, required: [true, 'User groups require a name'], lowercase: true},
    // Can't be unique, multiple users can point to the same lists
    lists: [{type: String, required: [true, 'User lists require a name'], lowercase: true}]
}, {timestamps: true})

export const UserModel = mongoose.model("Users", UserSchema)


/**
 * GROUP SCHEMA:
 * The Group Schema contains an object, which provides access to a group. Is its essence, a group is a hub. A central
 * location for all members of the group (flat). For this
 */
const GroupSchema = new Schema({
    groupName: {
        type: String,
        required: [true, 'Groups require a name'],
        unique: true,
        lowercase: true,
        validate: customNameValidator
    },
    password: {type: String, required: [true, 'Groups require a password']},
    // A user can't be in more than one group
    users: [{
        type: String,
        required: [true, 'Group users require a name'],
        unique: true,
        lowercase: true,
        validate: customNameValidator
    }],
    // A group list cannot span across multiple groups
    lists: [{type: String, required: [true, 'Group lists require a name'], unique: true, lowercase: true}],
    chores: [ItemSchema]
}, {timestamps: true})

export const GroupModel = mongoose.model("Groups", UserSchema)