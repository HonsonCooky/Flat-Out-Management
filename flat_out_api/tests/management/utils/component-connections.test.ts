import {connectComponents} from "../../../src/management/utils/authorization/component-connections";
import {Types} from "mongoose";
import {UserModel} from "../../../src/schemas/entities/user-schema";
import {ModelType, RoleType} from "../../../src/interfaces/association";
import {GroupModel} from "../../../src/schemas/entities/group-schema";
import {TableModel} from "../../../src/schemas/non-entities/table-schema";
import {breakDown, clearDb, setup} from "../mongdb-test-helper";
import {FomUser} from "../../../src/interfaces/entities/fom-user";
import {FomGroup} from "../../../src/interfaces/entities/fom-group";
import {FomTable} from "../../../src/interfaces/non-entities/fom-table";
import {FomCalendar} from "../../../src/interfaces/non-entities/fom-calendar";
import {CalendarModel} from "../../../src/schemas/non-entities/calendar-schema";

describe("Connection Tests", () => {

  let userId = new Types.ObjectId()
  let groupId = new Types.ObjectId()
  let tableId = new Types.ObjectId()
  let tableId2 = new Types.ObjectId()
  let calendarId = new Types.ObjectId()
  let calendarId2 = new Types.ObjectId()
  let user: FomUser, group: FomGroup, table1: FomTable, table2: FomTable, calendar1: FomCalendar,
    calendar2: FomCalendar;

  beforeAll(async () => {
    await setup()
  }, 20000)

  beforeEach(async () => {
    user = new UserModel({
      _id: userId,
      fomVersion: '0.0.0 - Test',
      name: 'Test User',
      password: 'Test Password',
      jwtUuid: new Types.ObjectId(),
      ui: {
        name: 'Test',
        color: '#000000'
      },
      groups: [],
      shouldUpdate: false,
      tables: []
    })

    group = new GroupModel({
      _id: groupId,
      fomVersion: '0.0.0 - Test',
      name: 'Test Group',
      password: 'Test Password',
      jwtUuid: new Types.ObjectId(),
      ui: {
        name: 'Test',
        color: '#000000'
      },
      users: [{
        ref: userId,
        model: ModelType.USER,
        role: RoleType.WRITER,
        value: 'Test'
      }],
      tables: []
    })

    table1 = new TableModel({
      _id: tableId,
      name: "Test Table",
      fomVersion: '0.0.0 - Test',
      owner: {
        ref: new Types.ObjectId(),
        model: ModelType.USER,
        role: RoleType.WRITER,
        value: 'Unknown User'
      },
      colLength: 1,
      rowLength: 1,
      associations: []
    })


    table2 = new TableModel({
      _id: tableId2,
      name: "Test Table 2",
      fomVersion: '0.0.0 - Test',
      owner: {
        ref: new Types.ObjectId(),
        model: ModelType.USER,
        role: RoleType.WRITER,
        value: 'Unknown User'
      },
      colLength: 1,
      rowLength: 1,
      associations: []
    })

    calendar1 = new CalendarModel({
      _id: calendarId,
      name: "Test Calendar",
      fomVersion: '0.0.0 - Test',
      owner: {
        ref: new Types.ObjectId(),
        model: ModelType.USER,
        role: RoleType.WRITER,
        value: 'Unknown User'
      },
    })

    calendar2 = new CalendarModel({
      _id: calendarId2,
      name: "Test Calendar 2",
      fomVersion: '0.0.0 - Test',
      owner: {
        ref: new Types.ObjectId(),
        model: ModelType.USER,
        role: RoleType.WRITER,
        value: 'Unknown User'
      },
    })

    await user.save()
    await group.save()
    await table1.save()
    await table2.save()
    await calendar1.save()
    await calendar2.save()
  })

  afterEach(async () => {
    await clearDb()
  }, 20000)

  afterAll(async () => {
    await breakDown()
  }, 20000)

  it("Connect User to Table", async () => {
    await connectComponents(user, table1)
    expect(user.tables[0].ref).toBe(tableId)
    expect(table1.associations[0].ref).toBe(userId)

    let dbUser = await UserModel.findOne({_id: userId})
    expect(dbUser?.tables[0].ref).toStrictEqual(tableId)
    expect(dbUser?.tables[0].model).toBe(ModelType.TABLE)
    expect(dbUser?.tables[0].role).toBe(RoleType.REQUEST)
    expect(dbUser?.tables[0].value).toBe(table1.name)

    let dbTable = await TableModel.findOne({_id: tableId})
    expect(dbTable?.associations[0].ref).toStrictEqual(userId)
    expect(dbTable?.associations[0].model).toBe(ModelType.USER)
    expect(dbTable?.associations[0].role).toBe(RoleType.REQUEST)
    expect(dbTable?.associations[0].value).toBe(user.ui.name)
  })


  it("Connect User to Table with Role", async () => {
    await connectComponents(user, table1, {role: RoleType.READER})
    expect(user.tables[0].ref).toBe(tableId)
    expect(table1.associations[0].ref).toBe(userId)

    let dbUser = await UserModel.findOne({_id: userId})
    expect(dbUser?.tables[0].ref).toStrictEqual(tableId)
    expect(dbUser?.tables[0].model).toBe(ModelType.TABLE)
    expect(dbUser?.tables[0].role).toBe(RoleType.READER)
    expect(dbUser?.tables[0].value).toBe(table1.name)

    let dbTable = await TableModel.findOne({_id: tableId})
    expect(dbTable?.associations[0].ref).toStrictEqual(userId)
    expect(dbTable?.associations[0].model).toBe(ModelType.USER)
    expect(dbTable?.associations[0].role).toBe(RoleType.READER)
    expect(dbTable?.associations[0].value).toBe(user.ui.name)
  })

  it("Connect User to Table with Strict", async () => {
    await connectComponents(user, table1)
    expect(user.tables[0].ref).toBe(tableId)
    expect(table1.associations[0].ref).toBe(userId)

    let dbUser = await UserModel.findOne({_id: userId})
    expect(dbUser?.tables[0].ref).toStrictEqual(tableId)
    expect(dbUser?.tables[0].model).toBe(ModelType.TABLE)
    expect(dbUser?.tables[0].role).toBe(RoleType.REQUEST)
    expect(dbUser?.tables[0].value).toBe(table1.name)

    let dbTable = await TableModel.findOne({_id: tableId})
    expect(dbTable?.associations[0].ref).toStrictEqual(userId)
    expect(dbTable?.associations[0].model).toBe(ModelType.USER)
    expect(dbTable?.associations[0].role).toBe(RoleType.REQUEST)
    expect(dbTable?.associations[0].value).toBe(user.ui.name)


    expect(async () => await connectComponents(user, table2, {strict: true})).toThrow()

  })
})
