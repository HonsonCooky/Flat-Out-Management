import mongoose, {Schema} from "mongoose";


/**
 * Different types of string entries. 'Required' and 'Unique' characteristics are used to differentiate different types
 * of data entries.
 */
const nameValidator = {
    validate: (v: string) => /\S\w{2, 14}/g.test(v),
    message: (_: any) => `400:Name length is too short or long, and or doesn't start with a character`
}

const emailValidator = {
    validate: (v: string) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v),
    message: (_: any) => `400:Invalid email address`
}

const val = {type: Number}
const str = {type: String}
const strReq = {type: String, required: true}
const strReqUni = {type: String, required: true, unique: true}
const name = {type: String, validate: nameValidator}
const nameReq = {type: String, required: true, validate: nameValidator}
const nameUni = {type: String, required: true, unique: true, validate: nameValidator}
const nameReqUni = {type: String, required: true, unique: true, validate: nameValidator}
const emailReqUni = {type: String, required: true, unique: true, validate: emailValidator}


/**
 * LIST SCHEMA
 */
const ItemSchema = new Schema({
    itemName: nameReqUni,
    itemDesc: str,
    association: name,
    multiplier: val,
})

const ListSchema = new Schema({
    secret: strReqUni,
    listName: nameReq,
    listItems: [ItemSchema]
})

/**
 * USER SCHEMA
 */
const UserSchema = new Schema({
    email: emailReqUni,
    username: nameReqUni,
    password: strReq,
    nickname: nameUni,
    group: nameReq,
    lists: [strReq]
})

export const UserModel = mongoose.model("Users", UserSchema)


/**
 * GROUP SCHEMA
 */
const GroupSchema = new Schema({
    groupName: nameReqUni,
    password: strReq,
    users: [nameReqUni],
    lists: [strReqUni],
    chores: [ItemSchema]
})

export const GroupModel = mongoose.model("Groups", UserSchema)