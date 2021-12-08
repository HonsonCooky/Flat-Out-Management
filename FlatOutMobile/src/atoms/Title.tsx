import React, {useContext} from "react";
import {StyleProp, Text, TextStyle} from "react-native";
import IOverrideStyleWithChildren from "../utils/IOverrideStyleWithChildren";
import {ThemeContext} from "../oraganisms/ThemeProvider";
import {combineStyles} from "../utils/IOverrideStyle";
import Font from "../styles/Font";


export default function Title (props: IOverrideStyleWithChildren ): JSX.Element {
  /** ------------------------------------------------------------------------------------------------------------------
   * Setup
   ------------------------------------------------------------------------------------------------------------------*/
  const Theme = useContext(ThemeContext)

  const defaultStyle: StyleProp<TextStyle> = {
    fontSize: Font.size.XL,
    fontFamily: Font.family(Font.fontFamilies.latoBlI),
    color: Theme.palette.white,
    textAlign: "center",
  }

  /** ------------------------------------------------------------------------------------------------------------------
   * Component
   ------------------------------------------------------------------------------------------------------------------*/
  return(
    <Text style={combineStyles(defaultStyle, props.styleText)}>
      {props.children}
    </Text>
  )

}