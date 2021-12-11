import React, {useContext} from "react";
import {ThemeContext} from "./ThemeProvider";
import {ScrollView, StyleSheet, View, Dimensions} from "react-native";
import Spacing from "../styles/Spacing";
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
    // SCROLLING VIEW
    page: {
      marginTop: 165,
      alignItems: "center",
      width: Spacing.width,
      height: Spacing.height,
    },
    children: {
      width: Spacing.width,
      height: Spacing.height,
      paddingHorizontal: Spacing.paddingHorizontal,
      marginVertical: Spacing.marginVertical,
      marginBottom: "20%"
    },
    // HEADER
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
    <>
      <View style={defaultStyles.header}>
        <Ionicons
          name={props.icon}
          style={defaultStyles.icon}
        />
      </View>
      <ScrollView
        keyboardShouldPersistTaps={"handled"}
        contentContainerStyle={{flexGrow: 1}}
        showsVerticalScrollIndicator={false}
      >
        <View style={combineStyles(defaultStyles.page, props.styleView)}>
          <View style={defaultStyles.children}>
            {props.children}
          </View>
        </View>
      </ScrollView>
    </>
  )
}