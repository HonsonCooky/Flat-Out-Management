import {IFomGroup} from "../../interfaces/IFomGroup";
import {EventType, ModelType} from "../../interfaces/IFomEnums";
import {IFomAssociation} from "../../interfaces/IFomAssociation";
import {IFomUser} from "../../interfaces/IFomUser";
import {IFomEvent} from "../../interfaces/IFomEvent";

export async function groupCalendar(group: IFomGroup) {
  group.groupCalendar = (await group.populate({path: 'parents.ref'}))
    .parents
    // Get all users
    .filter((a: IFomAssociation) => a.model === ModelType.USER)
    // Map each user to {user, groupDates}
    .map((a: any) => {
      return (a.ref as IFomUser)
        .outOfFlatDates
        .filter((e: IFomEvent) => e.eType === EventType.GROUP)
        .map(({date, eType, header, message}: IFomEvent) => {
          return {
            date,
            eType,
            header: `${a.ref.uiName}: ${header}`,
            message,
            colorAssociation: a.ref.colorAssociation
          } as IFomEvent
        })
    })
    .flat()
}