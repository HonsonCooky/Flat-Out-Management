import mongoose from "mongoose";
import {CONFIG} from "../../src/config";
import {UserModel} from "../../src/schemas/entities/user-schema";
import {GroupModel} from "../../src/schemas/entities/group-schema";
import {TableModel} from "../../src/schemas/non-entities/table-schema";
import {CalendarModel} from "../../src/schemas/non-entities/calendar-schema";

export async function clearDb() {
  await UserModel.deleteMany()
  await GroupModel.deleteMany()
  await TableModel.deleteMany()
  await CalendarModel.deleteMany()
}

export async function setup() {
  await mongoose.connect(CONFIG.mongoDb.connectionStr)
  await clearDb()
}

export async function breakDown() {
  await clearDb()
  await mongoose.disconnect()
}