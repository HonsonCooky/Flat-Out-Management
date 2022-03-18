import {Request, Response} from "express";
import {IFomRes} from "../interfaces/IFomRes";
import {GroupModel, IGroup} from "../schemas/documents/GroupSchema";
import {saltAndHash} from "./util/BcryptPartials";
import {ModelEnum, RoleEnum} from "../interfaces/FomEnums";
import {connectDocuments, getParent, getParentChildAndAssociation, getTypeFromDoc, roleScore} from "./util/Partials";
import {IFomController} from "../interfaces/IFomController";
import {IFomComponent} from "../interfaces/IFomComponent";

/**
 * GROUP REGISTER: Create a new group document
 * @param req
 * @param res
 */
export async function groupRegister(req: Request, res: Response): Promise<IFomRes> {
  let parent: IFomController | IFomComponent = await getParent(req, res) // This is the intended parent of the table
  let {name, password} = req.body

  let group: IGroup = new GroupModel({
    uiName: name,
    password: saltAndHash(password)
  })

  await connectDocuments(
    {item: parent, model: getTypeFromDoc(parent)},
    {item: group, model: ModelEnum.GROUP},
    RoleEnum.OWNER)

  return {
    msg: `Successfully registered group ${name} with owner ${parent.uiName}`,
    item: group
  }
}


/**
 * GROUP UPDATE: Update a group document
 * @param req
 * @param res
 */
export async function groupUpdate(req: Request, res: Response): Promise<IFomRes> {
  let {newName, newPassword} = req.body
  let {parent, child, association} = await getParentChildAndAssociation<IGroup>(req, res)
  let {role} = association

  if (roleScore(role) > roleScore(RoleEnum.WRITE))
    throw new Error(`400: ${parent.uiName} does not have appropriate authorization over table ${child.uiName}`)

  if ((newName || newPassword)) {
    if (role === RoleEnum.OWNER) {
      child.password = saltAndHash(newPassword) ?? child.password
    } else throw new Error(`400: Invalid authorization to update group name or password. Only the owner can do this`)
  }

  child.uiName = newName ?? child.uiName

  await child.save()

  return {
    msg: `${parent._id} successfully updated ${child.uiName}`,
    item: child
  }
}
