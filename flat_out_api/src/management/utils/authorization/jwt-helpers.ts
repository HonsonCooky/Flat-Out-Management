import {DbEntity} from "../../../interfaces/entities/db-entity";
import {ModelType, RoleType, roleVal} from "../../../interfaces/association";
import {models} from "mongoose";
import {Response} from "express";
import {JwtContract} from "../../../interfaces/utils/jwt-contract";


/**
 * Extract the contents of the JWT, validate the information, and return the db entity alongside some other values
 * that may be used later.
 * @param res An express response object, that contains the JWT values
 * @param minRole The minimum {@link RoleType} that the JWT should have, to use this entity.
 */
export async function getJwtEntity<T extends DbEntity>(res: Response, minRole: RoleType = RoleType.WRITER)
  : Promise<{ entity: T, model: ModelType, role: RoleType }> {
  // Ensure some value exists before continuing, and respond how is necessary
  if (!res.locals.jwt) throw new Error('400: Action requires an authenticated entity, try logging in')

  // Extract JWT into an easier to utilize variable
  let jwt = res.locals.jwt as JwtContract

  // If the role is of greater value (higher index means less authority), then ensure the request goes to the dump
  if (roleVal(jwt.role) > roleVal(minRole)) throw new Error('400: Unauthorized utilization of entity')

  // Extract the entity from DB
  let entity = await models[jwt.model].findOne<T>({jwtUuid: jwt.jwtUuid})
  if (!entity) throw new Error('400: Action requires an authenticated entity, try creating account')
  return {entity, model: jwt.model, role: jwt.role}
}
