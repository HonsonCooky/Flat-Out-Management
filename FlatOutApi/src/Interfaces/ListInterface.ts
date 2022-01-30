import {FOMObjectWithLinks, FOMObjectWithName} from "./_FOMObjects";

export interface Item extends FOMObjectWithName, FOMObjectWithLinks {
  desc: string
}

export interface List extends FOMObjectWithName, FOMObjectWithLinks {

}