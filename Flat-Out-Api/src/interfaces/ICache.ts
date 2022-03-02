import {ModelEnum, RoleEnum} from "./FomEnums";


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