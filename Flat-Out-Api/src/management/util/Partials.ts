import {models, Types} from "mongoose";
import {IFomAssociation} from "../../interfaces/IFomAssociation";
import {Request, Response} from "express";
import {GroupModel, IGroup} from "../../schemas/documents/GroupSchema";
import {IUser, UserModel} from "../../schemas/documents/UserSchema";
import {compareHashes} from "./AuthPartials";
import {RoleEnum} from "../../interfaces/FomEnums";
import {IFomComponent} from "../../interfaces/IFomComponent";

/**
 * REMOVE DOCUMENT FROM ASSOCIATIONS: Before deleting some document, remove its reference from all associations.
 * @param doc
 * @param associations
 */
export async function removeDocumentFromAssociations(doc: { _id: Types.ObjectId, [key: string]: any },
                                                     ...associations: IFomAssociation[]) {
  for (let a of associations) {
    let other: any = await models[a.model].findOne({_id: a.ref})
    if (!other) continue

    if (other.parents) await other.updateOne({
      parents: other.parents
        .filter((b: IFomAssociation) => !doc._id.equals(b.ref))
    })

    if (other.children) await other.updateOne({
      children: other.children
        .filter((b: IFomAssociation) => !doc._id.equals(b.ref))
    })
  }
}

/**
 * GET USER: Get a user from the document db
 * @param r
 */
export async function getUser(r: Request | Response): Promise<IUser> {
  // If this is a request
  if ("body" in r) {
    let {name, password} = (r as Request).body
    let user: IUser | null = await UserModel.findOne({name})
    if (!user) throw new Error(`400: Invalid user name`)
    if (!compareHashes(password, user.password)) throw new Error(`400: Invalid user authorization`)
    return user
  }
  // Else it's jwt
  else {
    let user: IUser | null = await UserModel.findOne({dynUuid: (r as Response).locals.jwt?.dynUuid})
    if (!user) throw new Error(`400: Invalid JWT`)
    return user
  }
}

/**
 * GET GROUP: Get a group, with some error checking
 * @param req
 */
export async function getGroup(req: Request): Promise<IGroup> {
  let group: IGroup | null = await GroupModel.findOne({_id: req.params.id})
  if (!group) throw new Error(`400: Unable to find group`)
  return group
}

/**
 * GET ASSOCIATION: Get the association between a document, and it's user (document is always right).
 * @param user
 * @param other
 */
export async function getAssociation<T extends IFomComponent>(user: IUser, other: T): Promise<IFomAssociation> {
  let a: IFomAssociation | undefined = other.parents.find((a: IFomAssociation) => user._id.equals(a.ref))
  if (!a) throw new Error(`400: User is not associated with this group`)
  return a
}

/**
 * GET USER DOC AND ASSOCIATION: Get the user, and the document and their association
 * @param req
 * @param res
 * @param getFn
 */
export async function getUserDocAndAssociation<T extends IFomComponent>(
  req: Request, res: Response, getFn: (req: Request) => Promise<T>):
  Promise<{ user: IUser, other: T, association: RoleEnum }> {

  let user: IUser = await getUser(res)
  let other: T = await getFn(req)
  let association = (await getAssociation<T>(user, other)).role

  return {
    user,
    other,
    association
  }
}