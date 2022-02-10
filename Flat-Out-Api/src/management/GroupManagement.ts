import {IDocModelAndRole} from "../interfaces/_docRoleAndModel";
import {IFOMProtectedNode, IRes} from "../interfaces/_fomObjects";
import {getDocFromBody, getDocFromJWT} from "./_genericHelperFunctions";
import {ModelEnum, RoleEnum} from "../interfaces/_enums";
import {GroupModel} from "../schemas/GroupSchema";

/**
 * GROUP JOIN: Join a user to some group
 * @param jwt: JSON WEB TOKEN of user (joining)
 * @param body {
 *   docName: string,
 *   password: string,
 *   role: RoleEnum (requested authentication)
 * }
 * @param joinRequest: If true, body does not need to contain a role, and the user will be listed as a 'JoinRequest'
 * role.
 */
export async function groupJoin(jwt: IDocModelAndRole, body: any, joinRequest: boolean = false): Promise<IRes> {
  if (!Object.values(RoleEnum).includes(body.role))
    throw new Error(`400: "${body.role}" is not a valid role in a group`)

  let user: IFOMProtectedNode = await getDocFromJWT(jwt, ModelEnum.USER)
  let group: IFOMProtectedNode | null

  // If this is a join request, filter the ROLE and group association as such
  if (joinRequest) {
    body.role = RoleEnum.JOIN_REQUEST
    group = await GroupModel.findOne({docName: body.docName})
    if (!group) throw new Error(`400: Unable to find group with credentials ${JSON.stringify(body)}`);
  }
  // Else this is a genuine request, so you need a password
  else {
    group = await getDocFromBody(body, ModelEnum.GROUP)
  }


  // Connect user to group
  group.associations.push({
    doc: user._id,
    docModel: ModelEnum.USER,
    role: body.role
  })

  // Connect group to user
  user.associations.push({
    doc: group._id,
    docModel: ModelEnum.GROUP,
    role: body.role
  })

  await group.save()
  await user.save()

  return {
    msg: `Successfully joined user "${user.docName}" to group "${group.docName}"`
  }
}