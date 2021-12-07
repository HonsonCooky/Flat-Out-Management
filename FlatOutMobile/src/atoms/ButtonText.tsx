import React from "react";
import {View, Text, TouchableOpacity, StyleSheet} from "react-native";
import IOverrideStyle, {combineStyles} from "../utils/IOverrideStyle";
import {Ionicons} from "@expo/vector-icons";
import getFontSize from "../utils/GetFontSize";

interface buttonProps extends IOverrideStyle {
  onPress: () => void
  icon?: any
  text: string
}

export default function ButtonText(props: buttonProps): JSX.Element {
  /** ------------------------------------------------------------------------------------------------------------------
   * Setup
   ------------------------------------------------------------------------------------------------------------------*/

  const defaultStyles = StyleSheet.create({
    view: {},
    text: {}
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
