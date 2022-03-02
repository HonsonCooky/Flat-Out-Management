import {SchemaDefinition} from "mongoose";
import {IFomDocument} from "../../interfaces/IFomDocument";
import {FOM_ASSOCIATION, FOM_NAME, FOM_PASSWORD, FOM_VERSION} from "./SchemaPartials";

export const FomDocumentSchema: SchemaDefinition<IFomDocument> = {
  name: FOM_NAME,
  password: FOM_PASSWORD,
  associations: [FOM_ASSOCIATION],
  fomVersion: FOM_VERSION,
}