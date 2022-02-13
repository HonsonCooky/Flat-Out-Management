import {IRes} from "../interfaces/FomObjects";
import {IUser} from "../schemas/UserSchema";
import {controllerRegister} from "./ManagementHelpers";
import {ModelEnum} from "../interfaces/GlobalEnums";


export async function userRegister(body: any): Promise<IRes> {
  let user: IUser = controllerRegister(body, ModelEnum.USER) as IUser
  await user.save()
  return {
    msg: `Successfully registered user ${user.docName}`
  }
}

// export async function userLogin(): Promise<IRes>{
//
// }