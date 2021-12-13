import React, {useContext} from "react";
import {StyleSheet, View} from "react-native";
import IOverrideStyleWithChildren from "../utils/IOverrideStyleWithChildren";
import {combineStyles} from "../utils/IOverrideStyle";
import Spacing from "../styles/Spacing";
import {ThemeContext} from "./ThemeProvider";
import Font from "../styles/Font";
import Title from "../atoms/Title";

interface floatingCardProps extends IOverrideStyleWithChildren {
  cardTitle: string
}

export default function FloatingCard(props: floatingCardProps): JSX.Element {
  /** ------------------------------------------------------------------------------------------------------------------
   * Setup
   ------------------------------------------------------------------------------------------------------------------*/

  const Theme = useContext(ThemeContext)

  const defaultStyles = StyleSheet.create({
    view: {
      width: Spacing.width,
      borderRadius: Spacing.borderRadius,
      backgroundColor: Theme.palette.white,
      paddingVertical: Spacing.paddingVertical,
      paddingHorizontal: Spacing.paddingHorizontal,
      justifyContent: "center",
      alignContent: "center",
      elevation: Spacing.elevation,
    },
    text: {
      fontSize: Font.size.XXL,
      fontFamily: Font.family(Font.fontFamilies.latoBlI),
      color: Theme.palette.text,
      marginBottom: Spacing.marginVertical,
    }
  })

  /** ------------------------------------------------------------------------------------------------------------------
   * Component
   ------------------------------------------------------------------------------------------------------------------*/
  return (
    <View style={combineStyles(defaultStyles.view, props.styleView)}>
      <Title styleText={combineStyles(defaultStyles.text, props.styleText)}>
        {props.cardTitle}
      </Title>
      {props.children}
    </View>
  )
}