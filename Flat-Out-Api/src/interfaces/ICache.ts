import {ModelEnum, RoleEnum} from "./GlobalEnums";


/**
 * CACHE OBJECT: A cached object (linked to the user)
 */
export interface ICacheObject {
  path: string,
  obj: any,
  objModel: ModelEnum,
  role: RoleEnum,
}

export interface ICache {
  cacheObjs: ICacheObject[]
  cacheUpdateRequired: boolean,
}