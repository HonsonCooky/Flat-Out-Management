import {ModelEnum, RoleEnum, SearchOperator} from '../interfaces/_enums';
import {IDocModelAndRole, IFOMObject} from '../interfaces/_fomObjects';
import {Types} from 'mongoose';

/**
 * SEARCH ASSOCIATIONS: IFOMObjects have a list of associations (rather than multiple individual lists). This
 * ensures that extensions in the future can easily be added.
 * @param obj: The document with associations to be searched
 * @param searchFilter: A recreation of IDocModelAndRole which enables each component to be optional
 * @param operand:
 */
export function searchAssociations(obj: IFOMObject,
                                   searchFilter: { doc?: Types.ObjectId, docModel?: ModelEnum, role?: RoleEnum },
                                   operand: SearchOperator = SearchOperator.AND): IDocModelAndRole[] {
  return obj.associations.filter((dmr: IDocModelAndRole) => {
    switch (operand) {

      // Defaults to true to ensure cases without parameters don't affect the search
      case SearchOperator.AND:
        return (searchFilter.doc ? searchFilter.doc.equals(dmr.doc) : true) &&
          (searchFilter.docModel ? searchFilter.docModel === dmr.docModel : true) &&
          (searchFilter.role ? searchFilter.role === dmr.role : true)

      // Defaults to false to ensure no false positives
      case SearchOperator.OR:
        return (searchFilter.doc ? searchFilter.doc.equals(dmr.doc) : false) ||
          (searchFilter.docModel ? searchFilter.docModel === dmr.docModel : false) ||
          (searchFilter.role ? searchFilter.role === dmr.role : false) ||
          // Edge case, where search filter is empty, but operand is set to OR
          (!searchFilter.doc && !searchFilter.docModel && !searchFilter.role)
    }
  })
}