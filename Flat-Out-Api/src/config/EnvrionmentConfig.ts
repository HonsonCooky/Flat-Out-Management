import {config} from "dotenv";

/**
 * ENVIRONMENT VARIABLES
 * Using dotenv package, get the process.env values.
 */

config()

if (
  !process.env.DB_USERNAME ||
  !process.env.DB_PASSWORD ||
  !process.env.DB_HOST ||
  !process.env.DB_NAME ||
  !process.env.PORT ||
  !process.env.SERVER_TOKEN_ISSUER ||
  !process.env.SERVER_TOKEN_SECRET ||
  !process.env.SERVER_TOKEN_EXPIRATION_DAYS
)
  throw new Error('500: Missing environment variables')

const SERVER_PORT: string = process.env.PORT
const SERVER_TOKEN_ISSUER: string = process.env.SERVER_TOKEN_ISSUER
const SERVER_TOKEN_SECRET: string = process.env.SERVER_TOKEN_SECRET
const SERVER_TOKEN_EXPIRATION_DAYS: string = process.env.SERVER_TOKEN_EXPIRATION_DAYS
const DATABASE_ACCESS: string =
  `mongodb+srv://` +
  `${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}` +
  `@${process.env.DB_HOST}/${process.env.DB_NAME}` +
  `?retryWrites=true&w=majority`


/**
 * VERSION: Get the VCS value from the package.json
 */
const packageJson: any = require('../../package.json')
const fomVersion: string = packageJson.version


/**
 * EXPORT: Export all the above, tied with a bow, in an object
 */

let envConfig = {
  fomVersion,
  port: SERVER_PORT,
  mongoDb: DATABASE_ACCESS,
  token: {
    issuer: SERVER_TOKEN_ISSUER,
    secret: SERVER_TOKEN_SECRET,
    expirationDays: SERVER_TOKEN_EXPIRATION_DAYS
  }
}

export = envConfig