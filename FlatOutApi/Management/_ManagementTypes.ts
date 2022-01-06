export type FOMAuth = {
  identifier: string,
  secret: string,
}

export type FOMReq = {
  auth: FOMAuth,
  msg: any
}
