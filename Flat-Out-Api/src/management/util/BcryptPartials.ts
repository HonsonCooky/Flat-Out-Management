import bcrypt from "bcryptjs";

/**
 * SALT AND HASH: Salt and hash a given input
 * @param input
 */
export function saltAndHash(input: string): string | null {
  if (!input) return null
  return bcrypt.hashSync(input, bcrypt.genSaltSync())
}

/**
 * COMPARE HASHES: Validate that a given string 'a' hashes into 'b'.
 * @param a
 * @param b
 */
export function compareHashes(a?: string, b?: string): boolean {
  if (!a || !b) return false
  return bcrypt.compareSync(a, b)
}
