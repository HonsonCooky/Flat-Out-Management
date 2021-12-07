import React, {useContext} from "react";
import {StyleProp, TextInput, TextStyle, TouchableWithoutFeedback} from "react-native";
import {ThemeContext} from "../oraganisms/ThemeProvider";
import IOverrideStyle, {combineStyles} from "../utils/IOverrideStyle";

/** ------------------------------------------------------------------------------------------------------------------
 * Interface
 ------------------------------------------------------------------------------------------------------------------*/
interface inputProps extends IOverrideStyle {
  value?: string,
  placeHolder: string,
  onChangeText: (s: string) => void,
}

export default function Input(props: inputProps): JSX.Element {

  /** ------------------------------------------------------------------------------------------------------------------
   * Setup
   ------------------------------------------------------------------------------------------------------------------*/
  const Theme = useContext(ThemeContext)

  const defaultStyle: StyleProp<TextStyle> = {}

  /** ------------------------------------------------------------------------------------------------------------------
   * Component
   ------------------------------------------------------------------------------------------------------------------*/
  return (
    <TouchableWithoutFeedback>
      <TextInput
        placeholder={props.placeHolder}
        onChangeText={props.onChangeText}
        placeholderTextColor={Theme.palette.placeholder}
        style={combineStyles(defaultStyle, props.styleText)}
      />
    </TouchableWithoutFeedback>
  )
}