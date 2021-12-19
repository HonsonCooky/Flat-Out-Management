/** ---------------------------------------------------------------------------------------------------------------
 * NAME VALIDATOR: Ensure that a name is between 3 and 20 chars, also ensure that a name starts with a char
 --------------------------------------------------------------------------------------------------------------- */
function nameValid(v: string) {return /^\S.{2,19}$/.test(v)}
export const nameValidator = [nameValid, "400:Names need to be 3-20 characters long; starting with a character"]

/** ---------------------------------------------------------------------------------------------------------------
 * ID VALIDATOR: Ensure that a ID's have unique identifiers, and start with their needed type
 --------------------------------------------------------------------------------------------------------------- */
const idValid = (key: string, v: string) => v.startsWith(key)
export const idValidator = (key: string) => [(v: string) => idValid(key, v), "400:Given incorrect type of ID"]

/** ---------------------------------------------------------------------------------------------------------------
 * POPULATED LIST VALIDATOR: Ensure that a list has at least one item in it
 --------------------------------------------------------------------------------------------------------------- */
function populatedList(v: any[]){ return Array.isArray(v) && v.length > 0}
export const populatedListValidator = [populatedList, "400:Empty list"]
