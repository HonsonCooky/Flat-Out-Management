import {SchemaType} from "../Schemas/_SchemaTypes";
import {GroupModel} from "../Schemas/GroupSchema";
import {ListModel} from "../Schemas/ListSchema";
import {UserModel} from "../Schemas/UserSchema";
import {ItemModel} from "../Schemas/ItemSchema";

/**
 * ID CHECKS: Cleans up all items from ID's that no longer exist. This method is preferred over simply throwing the
 * user back an error, as often the remedy for this
 */


const documentIdKeys: any = {
  User: [
    {key: "groups", model: GroupModel},
    {key: "lists", model:ListModel}
  ],
  Group: [
    {key: "users", model: UserModel},
    {key: "chores", model: ListModel},
    {key: "messages", model: ListModel},
    {key: "games", model: ListModel},
    {key: "extraLists", model: ListModel}
  ],
  List: [
    {key: "items", model: ItemModel}
  ],
  Item: [
    {key: "associations", model: UserModel}
  ]
}

function cleanDocument(document: any, idKeys: any[]){
  console.log(idKeys)
}

export async function cleanDocumentConnections(document: any, type: SchemaType) {
  switch (type) {
    case SchemaType.User:
      cleanDocument(document, documentIdKeys[type.toString()])
      break
    case SchemaType.Group:
      cleanDocument(document, documentIdKeys[1])
      break
    case SchemaType.Item:
      cleanDocument(document, documentIdKeys[2])
      break
    case SchemaType.List:
      cleanDocument(document, documentIdKeys[3])
      break
  }
}