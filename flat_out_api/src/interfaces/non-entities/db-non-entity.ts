import {DbObject} from "../db-object";
import {Association} from "../association";

/**
 * NonEntity objects are those which are dependent on some entity. When the entity no longer exists, then neither
 * should the non-entity associated with it. In most cases, another association will be named 'owner' of the entity.
 */
export interface DbNonEntity extends DbObject {
  /**A specific {@link Association} that is the owner of this document*/
  owner: Association
  /**Other {@link Association}s that are linked to this document*/
  associations: Association[]
}