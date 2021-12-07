import {StyleProp} from "react-native";

export default function getFontSize(sty: StyleProp<any>): number {
  return JSON.parse(JSON.stringify(sty)).fontSize
}