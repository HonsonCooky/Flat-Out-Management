import {AvatarMetaDataImpl} from "../src/interfaces/utils/avatar-meta-data";
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
  let avatar = new AvatarMetaDataImpl(
    expirationDate,
    association,
  )

  expect(avatar.shouldDelete()).toBe(expected)
  expect(AvatarMetaDataImpl.from({association, expirationDate}).shouldDelete()).toBe(expected)
})