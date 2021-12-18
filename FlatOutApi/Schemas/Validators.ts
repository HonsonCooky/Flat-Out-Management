/** ---------------------------------------------------------------------------------------------------------------
 * NAME VALIDATOR: Ensure that a name is between 3 and 20 chars, also ensure that a name starts with a char
 --------------------------------------------------------------------------------------------------------------- */

function nameValid(v: string) {
  return /^\S.{2,19}$/.test(v)
}

export const nameValidator = [nameValid, "400:Names need to be 3-20 characters long; starting with a character"]

const idValid = (key: string, v: string) => v.startsWith(key)
export const idValidator = (key: string) => [(v: string) => idValid(key, v), "400:Given incorrect type of ID"]
export const IIdValidator = {type: String, required: [true, 'Missing UserID'], unique: true}

/** ---------------------------------------------------------------------------------------------------------------
 * UPDATE TYPE: When updating some pre-existing item, you need to be authenticated to do so. As such, the updateX
 * type, provides an interface for all updates. Those with other interfaces will override the "Update" item, as such
 * it is null to start with.
 --------------------------------------------------------------------------------------------------------------- */

export interface Update {
  token: string, // Provided token to validate authentication to update
  update: {} // Will need to override with specific type
}