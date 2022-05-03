import {IFomGroup} from "../../interfaces/IFomGroup";
import {EventType, ModelType, RoleType} from "../../interfaces/IFomEnums";
import {IFomAssociation} from "../../interfaces/IFomAssociation";
import {IFomUser} from "../../interfaces/IFomUser";
import {IFomEvent} from "../../interfaces/IFomEvent";
import {GroupModel} from "../../schemas/documents/GroupSchema";
import {authLevel} from "./GenericPartials";

export async function groupCalendar(group: IFomGroup) {
  let g: IFomGroup | null = await GroupModel.findOne({_id: group._id})
  if (!g) return;
  group.groupCalendar = (await g.populate({path: 'parents.ref'}))
    .parents
    // Get all users
    .filter((a: IFomAssociation) => a.model === ModelType.USER && authLevel(a.role) < authLevel(RoleType.ASSOCIATION))
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