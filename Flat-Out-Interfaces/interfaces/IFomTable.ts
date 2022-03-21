import {IFomComponent} from "./IFomComponent";
import {IFomTableHeader, IFomTableRecord} from "./IFomTableContents";
import {IFomTableConfig} from "./IFomTableConfig";

export interface IFomTable extends IFomComponent {
  fields: IFomTableHeader,
  records: IFomTableRecord[],
  config: IFomTableConfig,
}
