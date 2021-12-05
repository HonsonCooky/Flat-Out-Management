import React, {useContext} from "react";
import {StackNavigationOptions} from "@react-navigation/stack";
import {View, Text, StyleSheet} from "react-native";
import Font from "../styles/Font";
import {Button} from "react-native-paper";
import {Ionicons} from "@expo/vector-icons";
import Spacing from "../styles/Spacing";
import {ThemeContext} from "./ThemeProvider";


interface stackHeaderProps {
  icon: any,
  onPress: () => void
}

export default function StackHeader(rightButton?: stackHeaderProps): StackNavigationOptions {
  /** -----------------------------------------------------------------------------------------------------------------
   * Setup
   ----------------------------------------------------------------------------------------------------------------- */
  const Theme = useContext(ThemeContext)
  const fSize = Font.size.XL

  // Using a style sheet for multiple components
  const sty = StyleSheet.create({
    header: {
      backgroundColor: Theme.palette.primary,
      paddingHorizontal: Spacing.paddingHorizontal,
      flexDirection: 'row',
      alignItems: "center",
      justifyContent: "center",
      height: fSize * 3,
    },
    text: {
      position: "relative",
      top: Spacing.headerTop,
      fontSize: fSize,
      fontFamily: Font.family(Font.fontFamilies.scpBl),
      color: Theme.palette.base,
    },
    buttonLeft: {
      color: Theme.palette.base,
      fontSize: fSize,
      left: 0,
      top: Spacing.headerTop,
      position: "absolute",
      borderRadius: fSize,
    },
    buttonRight: {
      color: Theme.palette.base,
      fontSize: fSize,
      right: 0,
      top: Spacing.headerTop,
      position: "absolute",
      borderRadius: fSize,
    }
  })


  /** -----------------------------------------------------------------------------------------------------------------
   * Header
   ----------------------------------------------------------------------------------------------------------------- */
  return {
    header: ({navigation, route, back}): JSX.Element => (
      <View style={sty.header}>
        {/*The back button: Given we are not at the bottom of some nav stack, render a back button.*/}
        {back && (
          <Button style={sty.buttonLeft} onPress={() => navigation.goBack()}>
            <Ionicons name={'arrow-back'} style={sty.text}/>
          </Button>
        )}

        <Text style={sty.text}>
          {route.name}
        </Text>

        {/*The right button: A programmable button which can be used to enable additional header feature(s)*/}
        {rightButton && (
          <Button style={sty.buttonRight} onPress={rightButton.onPress}>
            <Ionicons name={rightButton.icon} style={sty.text}/>
          </Button>
        )}
      </View>
    ),
  }
}
