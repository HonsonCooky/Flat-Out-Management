import React, {useContext} from "react";
import {ThemeContext} from "./ThemeProvider";
import {StyleProp, ViewStyle} from "react-native";
import Spacing from "../styles/Spacing";
import {ScrollView} from "react-native-gesture-handler";
import IOverrideStyleWithChildren from "../utils/IOverrideStyleWithChildren";
import {combineStyles} from "../utils/IOverrideStyle";

export default function ThemedPageCentered(props: IOverrideStyleWithChildren): JSX.Element {

  /** ------------------------------------------------------------------------------------------------------------------
   * Setup
   ------------------------------------------------------------------------------------------------------------------*/
  const Theme = useContext(ThemeContext)

  const defaultStyle: StyleProp<ViewStyle> = {
    backgroundColor: Theme.palette.base,
    width: Spacing.width,
    height: Spacing.height,
    paddingHorizontal: Spacing.paddingHorizontal,
    paddingVertical: Spacing.paddingVertical,
    alignItems: "center",
    justifyContent: "center",
  }

  /** ------------------------------------------------------------------------------------------------------------------
   * Component
   ------------------------------------------------------------------------------------------------------------------*/
  return (
    <ScrollView
      keyboardShouldPersistTaps={"handled"}
      style={{backgroundColor: Theme.palette.base}}
      contentContainerStyle={combineStyles(defaultStyle, props.styleView)}>
      {props.children}
    </ScrollView>
  )
}