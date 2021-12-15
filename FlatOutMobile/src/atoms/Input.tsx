import React, {useContext} from "react";
import {StyleProp, TextInput, TextStyle} from "react-native";
import {ThemeContext} from "../oraganisms/ThemeProvider";
import IOverrideStyle, {combineStyles} from "../utils/IOverrideStyle";
import Font from "../styles/Font";
import Spacing from "../styles/Spacing";

/** ------------------------------------------------------------------------------------------------------------------
 * Interface
 ------------------------------------------------------------------------------------------------------------------*/
interface inputProps extends IOverrideStyle {
  placeholder: string,
  onChangeText: (s: string) => void,
  secureTextEntry?: boolean
}

export default function Input(props: inputProps): JSX.Element {

  /** ------------------------------------------------------------------------------------------------------------------
   * Setup
   ------------------------------------------------------------------------------------------------------------------*/
  const Theme = useContext(ThemeContext)

  const defaultStyle: StyleProp<TextStyle> = {
    width: Spacing.width,
    fontSize: Font.size.M,
    marginVertical: Spacing.marginVertical,
    paddingVertical: Spacing.paddingVertical,
    borderBottomWidth: Spacing.borderWidth,
    borderBottomColor: Theme.palette.base,
    fontFamily: Font.family(Font.fontFamilies.latoR),
  }

  /** ------------------------------------------------------------------------------------------------------------------
   * Component
   ------------------------------------------------------------------------------------------------------------------*/
  return (
    <TextInput
      placeholder={props.placeholder}
      onChangeText={props.onChangeText}
      placeholderTextColor={Theme.palette.placeholder}
      selectTextOnFocus={true}
      secureTextEntry={props.secureTextEntry}
      style={combineStyles(defaultStyle, props.styleText)}
    />
  )
}