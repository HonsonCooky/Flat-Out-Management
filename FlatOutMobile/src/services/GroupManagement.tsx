import {URI} from "./Common";

const getRequest = async (url: string): Promise<any> => {
  return fetch(url).then(data => data.json())
}

export const getGroupNames = async () => {
  const url = new URL(URI + "get/group-names")
  return getRequest(url.toString())
}