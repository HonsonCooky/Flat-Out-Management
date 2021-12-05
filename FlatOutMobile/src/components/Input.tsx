import React, {useContext} from "react";
import {StyleProp, TextInput, TextStyle, TouchableWithoutFeedback} from "react-native";
import Spacing from "../styles/Spacing";
import Font from "../styles/Font";
import {ThemeContext} from "../templates/ThemeProvider";
import IOverrideStyle, {combineStyles} from "../utils/IOverrideStyle";

interface inputProps extends IOverrideStyle {
  value?: string,
  placeHolder: string,
  onChangeText: (s: string) => void,
}

export default function Input(props: inputProps): JSX.Element {

  const Theme = useContext(ThemeContext)

  const defaultStyle: StyleProp<TextStyle> = {
    fontSize: Font.size.M,
    fontFamily: Font.family(Font.fontFamilies.sspR),
    width: Spacing.width,
    marginVertical: Spacing.marginVertical,
    paddingVertical: Spacing.paddingVerticalSmall,
    paddingHorizontal: Spacing.paddingHorizontal,
    borderRadius: Spacing.borderRadius,
    color: Theme.palette.text,
    backgroundColor: Theme.palette.white,
  }

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