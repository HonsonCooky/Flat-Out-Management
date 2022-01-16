export type Authentication = {
  identifier: string,
  secret: string,
}

export type FOMReq = {
  userAuth: Authentication,
  groupAuth: Authentication
  content: any
}

export type FOMRes = {
  item?: any,
  msg: string
}
