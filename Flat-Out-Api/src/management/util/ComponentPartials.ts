import {IFomAssociation} from "../../interfaces/IFomAssociation";
import {IFomComponent} from "../../interfaces/IFomComponent";
import {models} from "mongoose";
import {Request} from "express";

/**
 * GET COMPONENT FROM ASSOCIATION: Attempt to get a component from an association tuple.
 * @param association
 */
export async function getComponentFromAssociation(association: IFomAssociation): Promise<IFomComponent | null> {
  return models[association.model].findOne({_id: association.ref});
}

export function getComponentTypesAndIdsFromUrl(req: Request) {
  let values: string[] = req.originalUrl.split('/')

}

/**
 * COMPONENT FROM URL: Get the IFomComponent referenced in the URL.
 * @param req
 */
export function componentFromUrl(req: Request) {
  let url: string = req.originalUrl
  console.log(req.baseUrl, req.originalUrl, req.url)
}