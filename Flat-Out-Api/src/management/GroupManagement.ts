import {IDocModelAndRole} from "../interfaces/_docRoleAndModel";
import {IFOMProtectedNode, IRes} from "../interfaces/_fomObjects";
import {getDocFromBody, getDocFromJWT} from "./_genericHelperFunctions";
import {ModelEnum, RoleEnum} from "../interfaces/_enums";

/**
 * GROUP JOIN: Join a user to some group
 * @param jwt: JSON WEB TOKEN of user (joining)
 * @param body {
 *   docName: string,
 *   password: string,
 *   role: RoleEnum (requested authentication)
 * }
 */
export async function groupJoin(jwt: IDocModelAndRole, body: any): Promise<IRes> {
  if (!Object.values(RoleEnum).includes(body.role)) throw new Error(`400: "${body.role}" is not a valid role in a group`)

  let user: IFOMProtectedNode = await getDocFromJWT(jwt, ModelEnum.User)
  let group: IFOMProtectedNode = await getDocFromBody(body, ModelEnum.Group)

  if (body.role === RoleEnum.ADMIN && group) {
    // JOIN REQUEST
  }

  // // Connect user to group
  // group.associations.push({
  //   doc: user._id,
  //   docModel: ModelEnum.User,
  //   role: body.role
  // })
  //
  // // Connect group to user
  // user.associations.push({
  //   doc: group._id,
  //   docModel: ModelEnum.Group,
  //   role: RoleEnum.UNDEFINED
  // })
  //
  // await group.save()
  // await user.save()

  return {
    msg: `Successfully joined user "${user.docName}" to group "${group.docName}"`
  }
}