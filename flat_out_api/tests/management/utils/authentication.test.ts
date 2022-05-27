import {compareHashes, saltAndHash, signJWT} from "../../../src/management/utils/authentication";
import {Types} from "mongoose";
import {ModelType} from "../../../src/interfaces/association";
import {UserModel} from "../../../src/schemas/entities/user-schema";
import {extractJwt} from "../../../src/middleware/extract-jwt";
import {Request, Response} from "express";

describe('Authentication:', () => {
  it('Salt and Hash:', () => {
    let input = "Some String Value"
    let snh = saltAndHash(input)

    expect(snh).not.toBe(input)
    expect(snh).not.toBeNull()

    expect(compareHashes(input, snh)).toBeTruthy()
    expect(compareHashes(input, null)).toBeFalsy()
    expect(compareHashes(null, snh)).toBeFalsy()
  })

  it('JWT:', () => {
    let user = new UserModel({
      jwtUuid: new Types.ObjectId(),
    })

    let token = signJWT(user, ModelType.USER)
    expect(token).not.toBeNull()

    let req = {headers: {authorization: token}} as unknown as Request
    let res = {locals: {jwt: null}} as unknown as Response
    extractJwt()(req, res, () => {
    })

    expect(res.locals.jwt).not.toBeNull()
    expect(res.locals.jwt.jwtUuid).toBe(user.jwtUuid.toString())
    expect(res.locals.jwt.model).toBe(ModelType.USER)
  })
})