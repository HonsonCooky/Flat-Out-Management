import {connectComponents} from "../../../src/management/utils/authorization/component-connections";
import {Types} from "mongoose";
import {UserModel} from "../../../src/schemas/entities/user-schema";
import {ModelType, RoleType} from "../../../src/interfaces/association";
import {GroupModel} from "../../../src/schemas/entities/group-schema";
import {TableModel} from "../../../src/schemas/non-entities/table-schema";

describe("Connection Tests", () => {

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
    groups: [],
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
    tables: []
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
    associations: []
  })

  it("Connect User to Table", async () => {
    await connectComponents(user, table)
  })
})
