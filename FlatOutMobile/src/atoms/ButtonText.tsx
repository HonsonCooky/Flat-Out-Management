import React, {useContext} from "react";
import {View, Text, TouchableOpacity, StyleSheet} from "react-native";
import IOverrideStyle, {combineStyles} from "../utils/IOverrideStyle";
import {Ionicons} from "@expo/vector-icons";
import getFontSize from "../utils/GetFontSize";
import {ThemeContext} from "../oraganisms/ThemeProvider";
import Spacing from "../styles/Spacing";
import Font from "../styles/Font";

interface buttonProps extends IOverrideStyle {
  onPress: () => void
  icon?: any
  text: string
}

export default function ButtonText(props: buttonProps): JSX.Element {
  /** ------------------------------------------------------------------------------------------------------------------
   * Setup
   ------------------------------------------------------------------------------------------------------------------*/
  const Theme = useContext(ThemeContext)

  const defaultStyles = StyleSheet.create({
    view: {
      backgroundColor: Theme.palette.secondaryLight,
      width: Spacing.width,
      borderRadius: Font.size.M,
      marginVertical: Spacing.marginVertical,
      paddingVertical: Spacing.paddingVertical,
      paddingHorizontal: Spacing.paddingHorizontal,
    },
    text: {
      textAlign: "center",
      fontSize: Font.size.M,
      fontFamily: Font.family(Font.fontFamilies.latoB),
      color: Theme.palette.text
    }
  })

  const fontSize = getFontSize(combineStyles(defaultStyles.text, props.styleText))

  /** ------------------------------------------------------------------------------------------------------------------
   * Component
   ------------------------------------------------------------------------------------------------------------------*/
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={combineStyles(defaultStyles.view, props.styleView)}>
        {props.icon && <Ionicons name={props.icon} size={fontSize}/>}
        <Text style={combineStyles(defaultStyles.text, props.styleText)}>
          {props.text}
        </Text>
      </View>
    </TouchableOpacity>
  )
}
