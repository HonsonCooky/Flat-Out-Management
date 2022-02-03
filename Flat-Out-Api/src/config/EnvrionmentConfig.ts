import {config} from "dotenv";

/**
 * ENVIRONMENT VARIABLES
 * Using dotenv package, get the process.env values. Stored here is sensitive data which would be best not shown in a
 * public Git repository.
 */
config()

if (
  !process.env.DATABASE_ACCESS ||
  !process.env.SERVER_PORT ||
  !process.env.SERVER_TOKEN_EXPIRATION ||
  !process.env.SERVER_TOKEN_ISSUER ||
  !process.env.SERVER_TOKEN_SECRET
)
  throw new Error('500: Missing environment variables')

const DATABASE_ACCESS: string = process.env.DATABASE_ACCESS
const SERVER_PORT: string = process.env.SERVER_PORT
const SERVER_TOKEN_EXPIRATION: string = process.env.SERVER_TOKEN_EXPIRATION
const SERVER_TOKEN_ISSUER: string = process.env.SERVER_TOKEN_ISSUER
const SERVER_TOKEN_SECRET: string = process.env.SERVER_TOKEN_SECRET

let envConfig = {
  port: SERVER_PORT,
  mongoDb: DATABASE_ACCESS,
  token: {
    expiration: SERVER_TOKEN_EXPIRATION,
    issuer: SERVER_TOKEN_ISSUER,
    secret: SERVER_TOKEN_SECRET
  }
}

export = envConfig