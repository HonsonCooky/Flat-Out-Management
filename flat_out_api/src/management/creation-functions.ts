import {models, Types} from "mongoose";
import {Request, Response} from "express";
import {FomRes} from "../interfaces/utils/fom-res";
import {extractModelType} from "./utils/url-handler";
import {ModelType, RoleType} from "../interfaces/association";
import {getJwtEntity} from "./utils/authorization";
import {DbNonEntity} from "../interfaces/non-entities/db-non-entity";
import {FomTable, Record} from "../interfaces/non-entities/fom-table";
import {TableModel} from "../schemas/non-entities/table-schema";
import {FomCalendar} from "../interfaces/non-entities/fom-calendar";
import {CalendarModel} from "../schemas/non-entities/calendar-schema";

/**
 * Entities are rather generic data structures. Users and Groups differ very little. So, this function extracts the
 * model from the url, and creates the entity based on the information from the request body.
 * @param req
 * @param res
 */
export async function createEntity(req: Request, res: Response): Promise<FomRes> {
  let modelType = extractModelType(req)
  let {name, password, nickname, color, avatar} = req.body

  let entity = new models[modelType]({
    name,
    password,
    jwtUuid: new Types.ObjectId(),
    ui: {
      name: nickname ?? name,
      color: color ?? '#' + (Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0'),
    }
  })

  if (modelType === ModelType.USER) {
    entity.shouldUpdate = false
  }

  // TODO: Link to avatar
  entity.save()

  return {
    msg: `Created ${modelType} ${nickname ?? name} successfully`,
    item: entity
  }
}

/**
 * NonEntities are more complex and dynamic in their data structures. However, they can still utilize the same
 * technique used from the 'createEntity' function. Here, we switch to different builder functions, based on the
 * type presented in the request url.
 * @param req
 * @param res
 */
export async function createNonEntity(req: Request, res: Response): Promise<FomRes> {
  let modelType = extractModelType(req)
  let {entity, model} = await getJwtEntity(res)

  let nonEntity = new models[modelType]({
    owner: {
      ref: entity._id,
      model,
      role: RoleType.WRITER,
      value: entity.ui.name
    }
  })

  switch (modelType) {
    case ModelType.TABLE:
      nonEntity = buildTable(req, nonEntity)
      break;
    case ModelType.CALENDAR:
      nonEntity = buildCalendar(req, nonEntity)
      break;
    default:
      throw new Error(`400: '${modelType}' is not a valid Non-Entity model type`)
  }

  return {
    msg: `Created ${modelType} successfully`
  }
}

/**
 * Build a table, given the NonEntity base object. Extend with table specific fields
 * @param req
 * @param nonEntity
 */
function buildTable(req: Request, nonEntity: DbNonEntity): FomTable {
  let {fields, records, rotations} = req.body
  return new TableModel({
    ...nonEntity,
    colLength: Math.max(...records.map((record: Record) => record.length)),
    rowLength: records.length,
    fields,
    records,
    rotations,
  })
}

/**
 * Build a calendar, given the NonEntity base object. Extend with calendar specific fields
 * @param req
 * @param nonEntity
 */
function buildCalendar(req: Request, nonEntity: DbNonEntity): FomCalendar {
  let {events} = req.body
  return new CalendarModel({
    ...nonEntity,
    events
  })
}