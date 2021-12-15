import {getRequest} from "./Common";

export const getGroupNames = async () => {
  return getRequest("group-names")
}