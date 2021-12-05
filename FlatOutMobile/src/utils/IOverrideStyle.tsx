import {StyleProp, TextStyle, ViewStyle} from "react-native";


export const combineStyles = (a: StyleProp<any>, b: StyleProp<any>) => {
  return {...a, ...b}
}

export default interface IOverrideStyle {
  styleView?: StyleProp<ViewStyle>
  styleText?: StyleProp<TextStyle>
}