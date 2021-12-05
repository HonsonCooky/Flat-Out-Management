import React from "react";
import {StyleSheet, View, Text, TouchableOpacity} from "react-native";
import IOverrideStyle, {combineStyles} from "../utils/IOverrideStyle";
import {useContext} from "react";
import {ThemeContext} from "../templates/ThemeProvider";
import Font from "../styles/Font";
import Spacing from "../styles/Spacing";

interface buttonProps extends IOverrideStyle{
  onPress: () => void
  text: string
}

export default function Button(props: buttonProps): JSX.Element {

  const Theme = useContext(ThemeContext)

  const defaultStyles = StyleSheet.create({
    text: {
      fontSize: Font.size.L,
      color: Theme.palette.text
    },
    view: {
      backgroundColor: Theme.palette.secondary,
      marginTop: Spacing.contentGap,
      paddingVertical: Spacing.paddingVerticalSmall,
      paddingHorizontal: Spacing.paddingHorizontal,
      borderRadius: Spacing.borderRadius,
    }
  })

  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={combineStyles(defaultStyles.view, props.styleView)}>
        <Text style={combineStyles(defaultStyles.text, props.styleText)}>
          {props.text}
        </Text>
      </View>
    </TouchableOpacity>
  )
}