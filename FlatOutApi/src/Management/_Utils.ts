import {FOMReq} from "../Interfaces/_Enums";

/**
 * SANITIZE: Remove the stored password from the user. Sanitizing for client consumption.
 * @param document: Instance of MongoDB user
 */
export function sanitizeDocument(document: any) {
  if (!document) throw new Error('500: Unable to sanitize an unknown document')
  const {password, ...sanitized} = document._doc
  return sanitized
}


/**
 * SAFETY DOCUMENTS: Ensure that documents are not updating components that require alternative API calls.
 */

export function safeContentFromBody(body: FOMReq): any {
  if (!body.content) throw new Error(`400: No content for update`)
  // Remove all fields which should only be updated through some other method (for all schemas)
  const {_id, sessionToken, groups, lists, association, users, joinRequests, chores, messages, ...rest} = body.content
  return rest
}