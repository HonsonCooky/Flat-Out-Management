import {breakDown, setup} from "../mongdb-test-helper";
import {UserModel} from "../../../src/schemas/entities/user-schema";
import {Types} from "mongoose";
import {ModelType, RoleType} from "../../../src/interfaces/association";
import {TableModel} from "../../../src/schemas/non-entities/table-schema";
import {GroupModel} from "../../../src/schemas/entities/group-schema";
import {getAssociation} from "../../../src/management/utils/authorization";

describe('Authorization: ', () => {
  let userId = new Types.ObjectId()
  let groupId = new Types.ObjectId()
  let tableId = new Types.ObjectId()

  let user = new UserModel({
    _id: userId,
    fomVersion: '0.0.0 - Test',
    name: 'Test',
    password: 'Test Password',
    jwtUuid: new Types.ObjectId(),
    ui: {
      name: 'Test',
      color: '#000000'
    },
    groups: [{
      ref: groupId,
      model: ModelType.GROUP,
      role: RoleType.WRITER,
      value: 'Test Group'
    }],
    shouldUpdate: false
  })

  let group = new GroupModel({
    _id: groupId,
    fomVersion: '0.0.0 - Test',
    name: 'Test',
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
    tables: [{
      ref: tableId,
      model: ModelType.TABLE,
      role: RoleType.READER,
      value: 'Test Table'
    }]
  })

  let table = new TableModel({
    _id: tableId,
    fomVersion: '0.0.0 - Test',
    owner: {
      ref: new Types.ObjectId(),
      model: ModelType.USER,
      role: RoleType.WRITER,
      value: 'Unknown User'
    },
    colLength: 1,
    rowLength: 1,
    associations: [{
      ref: groupId,
      model: ModelType.GROUP,
      role: RoleType.READER,
      value: 'Test Group'
    }]
  })

  beforeAll(async () => {
    await setup()

    await user.save()
    await table.save()
    await group.save()
  }, 20000)

  afterAll(async () => {
    await breakDown()
  }, 20000)

  it('Simple Association (1 layer):', async () => {
    let auth = await getAssociation(user, group)
    expect(auth.ref).toStrictEqual(groupId)
    expect(auth.model).toBe(ModelType.GROUP)
    expect(auth.role).toBe(RoleType.WRITER)
  })

  it('Nested Association (2 layers):', async () => {
    let auth = await getAssociation(user, table)
    expect(auth.ref).toStrictEqual(tableId)
    expect(auth.model).toBe(ModelType.TABLE)
    expect(auth.role).toBe(RoleType.READER)
  })

  it('Nested Association Reversed (2 layers):', async () => {
    let auth = await getAssociation(table, user)
    expect(auth.ref).toStrictEqual(userId)
    expect(auth.model).toBe(ModelType.USER)
    expect(auth.role).toBe(RoleType.READER)
  })
})