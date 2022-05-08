import {ModelType} from "../interfaces/IFomEnums";

export const idRegExp = '/:id([a-f0-9]{24})'
export const modelRegExp = `/:dbObject(${Object.values(ModelType).join('|')})`