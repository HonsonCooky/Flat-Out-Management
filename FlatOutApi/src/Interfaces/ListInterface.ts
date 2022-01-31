import {LinkedDocument, NamedDocument, TimeStampedDocument} from "./_FOMObjects";

export interface Item extends NamedDocument, LinkedDocument {
  desc: string
}

export interface List extends NamedDocument, LinkedDocument, TimeStampedDocument {
  items: Item[]
}