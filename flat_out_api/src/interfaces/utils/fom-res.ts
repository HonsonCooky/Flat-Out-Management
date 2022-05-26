/**
 * Flat Out Management response object to ANY given request. This will 100% contain a message 'msg', and
 * might contain an item (being requested) or a token (for later, auto-authentication, usage).
 */
export type FomRes = {
  /**A guaranteed message for any request to the backend*/
  msg: string,
  /**Some requests resolve with a json item. This is that item*/
  item?: any,
}
