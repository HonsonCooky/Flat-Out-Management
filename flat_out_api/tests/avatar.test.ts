import {AvatarMetaData} from "../src/interfaces/utils/avatar-meta-data";
import {Types} from "mongoose";

it.each([
  {
    association: undefined,
    expirationDate: new Date(new Date().setHours(new Date().getHours() + 2)),
    expected: false
  },
  {
    association: new Types.ObjectId(),
    expirationDate: new Date(new Date().setHours(new Date().getHours() - 2)),
    expected: false
  },
  {
    association: undefined,
    expirationDate: new Date(new Date().setHours(new Date().getHours() - 2)),
    expected: true
  }
])('Avatar.shouldDelete - expiration : $expirationDate', ({association, expirationDate, expected}) => {
  let avatar = new AvatarMetaData({
    association,
    expirationDate
  })

  expect(avatar.shouldDelete()).toBe(expected)
})

it.each([
  {
    association: undefined,
    expirationDate: new Date(new Date().setHours(new Date().getHours() + 2)),
    expected: false
  },
  {
    association: new Types.ObjectId(),
    expirationDate: new Date(new Date().setHours(new Date().getHours() - 2)),
    expected: false
  },
  {
    association: undefined,
    expirationDate: new Date(new Date().setHours(new Date().getHours() - 2)),
    expected: true
  }
])('Avatar.shouldDelete - expiration : $expirationDate - STATIC', ({association, expirationDate, expected}) => {
  expect(AvatarMetaData.shouldDelete({association, expirationDate})).toBe(expected)
})