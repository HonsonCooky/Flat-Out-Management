import {Association} from "../Association";
import {DbEntity} from "./DbEntity";

/**
 * A contract for Group documents on the MongoDB.
 * Groups are entities which connect several users together. These users can collectively see the same information,
 * however, associations have a 'role' fixed to them. So only users with 'writer' roles will be allowed to update the
 * information in this document.
 */
export interface FomGroup extends DbEntity {
  /**Users that are associated to this group*/
  users: Association[],
}