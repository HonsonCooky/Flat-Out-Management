import {Schema} from "mongoose";
import {GroupModel} from "./GroupSchema";
import {ListModel} from "./ListSchema";
import {UserModel} from "./UserSchema";
import {ModelType} from "../_Interfaces";


/**
 * CHECK IDS:
 * @param document
 * @param modelType
 */
export async function cleanIds(document: any, modelType: ModelType) {
  switch (modelType) {
    case ModelType.Users:
      document.groups = document.groups?.filter((ear: any) => GroupModel.exists({_id: ear.entity}))
      document.lists = document.lists?.filter((id: Schema.Types.ObjectId) => GroupModel.exists({_id: id}))
      break
    case ModelType.Groups:
      document.users = document.users?.filter((ear: any) => UserModel.exists({_id: ear.entity}))

      if (document.chores) // Weird nested schema
        document.chores.list = await ListModel.exists({_id: document.chores?.list}) ?
          document.chores.list : undefined
      break
    case ModelType.Lists:
      break
  }
}
