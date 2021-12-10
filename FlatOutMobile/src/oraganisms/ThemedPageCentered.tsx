import React, {useContext} from "react";
import {ThemeContext} from "./ThemeProvider";
import {StyleSheet, View, Dimensions} from "react-native";
import Spacing from "../styles/Spacing";
import {ScrollView} from "react-native-gesture-handler";
import IOverrideStyleWithChildren from "../utils/IOverrideStyleWithChildren";
import {combineStyles} from "../utils/IOverrideStyle";
import {Ionicons} from "@expo/vector-icons";

interface themedPageProps extends IOverrideStyleWithChildren {
  icon: any,
  headerHeight?: number,
}

export default function ThemedPageCentered(props: themedPageProps): JSX.Element {

  /** ------------------------------------------------------------------------------------------------------------------
   * Setup
   ------------------------------------------------------------------------------------------------------------------*/
  const Theme = useContext(ThemeContext)

  const defaultStyles = StyleSheet.create({
    page: {
      alignItems: "center",
      width: Spacing.width,
      height: Spacing.height,
      backgroundColor: Theme.palette.base,
    },
    children: {
      width: Spacing.width,
      height: Spacing.height,
      paddingHorizontal: Spacing.paddingHorizontal,
      marginVertical: Spacing.marginVertical,
      marginBottom: "20%"
    },
    header: {
      alignItems: "center",
      position: "absolute",
      width: Spacing.width,
      height: Dimensions.get("screen").height * 0.35,
      backgroundColor: Theme.palette.primary,
    },
    icon: {
      color: Theme.palette.text,
      fontSize: 150,
    },
  })

  /** ------------------------------------------------------------------------------------------------------------------
   * Component
   ------------------------------------------------------------------------------------------------------------------*/

  return (
    <ScrollView
      keyboardShouldPersistTaps={"handled"}
      contentContainerStyle={{flexGrow: 1}}
    >
      <View style={combineStyles(defaultStyles.page, props.styleView)}>
        <View style={defaultStyles.header}/>
        <Ionicons
          name={props.icon}
          style={defaultStyles.icon}
        />
        <View style={defaultStyles.children}>
          {props.children}
        </View>
      </View>
    </ScrollView>
  )
}