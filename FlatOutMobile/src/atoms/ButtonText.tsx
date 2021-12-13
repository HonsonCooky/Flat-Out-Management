import React, {useContext} from "react";
import {Text, TouchableOpacity, StyleSheet} from "react-native";
import IOverrideStyle, {combineStyles} from "../utils/IOverrideStyle";
import {Ionicons} from "@expo/vector-icons";
import getFontSize from "../utils/GetFontSize";
import {ThemeContext} from "../oraganisms/ThemeProvider";
import Spacing from "../styles/Spacing";
import Font from "../styles/Font";

interface buttonProps extends IOverrideStyle {
  text: string
  onPress: () => void
  icon?: any
}

export default function ButtonText(props: buttonProps): JSX.Element {
  /** ------------------------------------------------------------------------------------------------------------------
   * Setup
   ------------------------------------------------------------------------------------------------------------------*/
  const Theme = useContext(ThemeContext)

  const fontSize = getFontSize(combineStyles({fontSize: Font.size.L}, props.styleText))

  const defaultStyles = StyleSheet.create({
    view: {
      flexDirection: "row",
      alignItems: 'center',
      justifyContent: 'center',
      width: Spacing.width,
      borderRadius: Spacing.borderRadius,
      marginVertical: Spacing.marginVertical,
      paddingVertical: Spacing.paddingVertical,
      paddingHorizontal: Spacing.paddingHorizontal,
      backgroundColor: Theme.palette.secondaryLight,
      elevation: Spacing.elevation,
    },
    text: {
      textAlign: 'center',
      fontSize: Font.size.L,
      fontFamily: Font.family(Font.fontFamilies.latoB),
      color: Theme.palette.text
    },
    icon: {
      position: "absolute",
      left: Spacing.paddingLeft,
    }
  })

  /** ------------------------------------------------------------------------------------------------------------------
   * Component
   ------------------------------------------------------------------------------------------------------------------*/
  return (
    <TouchableOpacity onPress={props.onPress} activeOpacity={0.6}
                      style={combineStyles(defaultStyles.view, props.styleView)}>
      <>
        {props.icon && <Ionicons name={props.icon} size={fontSize} style={defaultStyles.icon}/>}
        <Text style={combineStyles(defaultStyles.text, props.styleText)}>
          {props.text}
        </Text>
      </>
    </TouchableOpacity>
  )
}
