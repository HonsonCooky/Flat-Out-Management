import {IFomAssociation} from "../../interfaces/IFomAssociation";
import {IFomComponent} from "../../interfaces/IFomComponent";
import {models} from "mongoose";
import {ModelEnum} from "../../interfaces/FomEnums";
import {Request} from "express";

/**
 * GET COMPONENT FROM ASSOCIATION: Attempt to get a component from an association tuple.
 * @param association
 */
export async function getComponentFromAssociation(association: IFomAssociation): Promise<IFomComponent | null> {
  return models[association.model].findOne({_id: association.ref});
}


const validComponents: string[] = [ModelEnum.GROUP, ModelEnum.TABLE]

export function componentTypeFromUrl(req: Request): ModelEnum {
  return <ModelEnum>req.params.component
}