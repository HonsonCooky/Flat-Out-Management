import {IFomGroup} from "../../interfaces/IFomGroup";
import {EventType, ModelType, RoleType} from "../../interfaces/IFomEnums";
import {IFomAssociation} from "../../interfaces/IFomAssociation";
import {IFomUser} from "../../interfaces/IFomUser";
import {IFomEvent} from "../../interfaces/IFomEvent";
import {GroupModel} from "../../schemas/documents/GroupSchema";
import {authLevel} from "./GenericPartials";

/**
 * Update a groups calendar. We need to grab all group members (owners and writer), then smash all their time events
 * which are labeled "flat" events together.
 * @param group
 */
export async function groupCalendar(group: IFomGroup) {
  let g: IFomGroup | null = await GroupModel.findOne({_id: group._id})
  if (!g) return;
  group.groupCalendar = (await g.populate({path: 'parents.ref'}))
    .parents
    // Get all users
    .filter((a: IFomAssociation) => a.model === ModelType.USER && authLevel(a.role) < authLevel(RoleType.READER))
    // Map each user to {user, groupDates}
    .map((a: any) => {
      return (a.ref as IFomUser)
        .outOfFlatDates
        .filter((e: IFomEvent) => e.eType === EventType.GROUP)
        .map(({from, to, eType, header, message}: IFomEvent) => {
          return {
            from,
            to,
            eType,
            header: `${a.ref.uiName}: ${header}`,
            message,
            colorAssociation: a.ref.colorAssociation
          } as IFomEvent
        })
    })
    .flat()
}