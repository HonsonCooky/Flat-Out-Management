import {IRes} from "../interfaces/_fomObjects";
import {_loginProtectedDocument, _registerProtectedDocument} from "./_genericManagementFullFunctions";
import {ModelEnum} from "../interfaces/_enums";

export async function groupRegister(body: any): Promise<IRes>{
  return _registerProtectedDocument(body, ModelEnum.Group)
}

export async function groupLogin(body: any){
  return _loginProtectedDocument(body, ModelEnum.Group)
}