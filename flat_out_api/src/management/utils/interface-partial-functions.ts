import {models, Types} from "mongoose";
import {Request, Response} from "express";
import {getUrlModelType} from "./url-handler";
import {RoleType} from "../../interfaces/association";
import {getJwtEntity} from "./authorization/authorization";
import {DbNonEntity} from "../../interfaces/non-entities/db-non-entity";
import {DbEntity} from "../../interfaces/entities/db-entity";

/**
 * Entities are rather generic data structures. Users and Groups differ very little. So, this function extracts the
 * model from the url, and creates the entity based on the information from the request body.
 * @param req
 * @param res
 */
export async function createEntity(req: Request, res: Response): Promise<DbEntity> {
  let modelType = getUrlModelType(req)
  let {name, password, nickname, color} = req.body

  return new models[modelType]({
    name,
    password,
    jwtUuid: new Types.ObjectId(),
    ui: {
      name: nickname ?? name,
      color: color ?? '#' + (Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0'),
    }
  })
}

/**
 * NonEntities are more complex and dynamic in their data structures. However, they can still utilize the same
 * technique used from the 'createEntity' function. Here, we switch to different builder functions, based on the
 * type presented in the request url.
 * @param req
 * @param res
 */
export async function createNonEntity(req: Request, res: Response): Promise<DbNonEntity> {
  let modelType = getUrlModelType(req)
  let {entity, model} = await getJwtEntity(res)
  let {name} = req.body

  return new models[modelType]({
    name,
    owner: {
      ref: entity._id,
      model,
      role: RoleType.WRITER,
      value: entity.ui.name
    }
  })
}