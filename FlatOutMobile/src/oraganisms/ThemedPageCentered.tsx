import React, {useContext} from "react";
import {ThemeContext} from "./ThemeProvider";
import {SafeAreaView, StyleSheet, View} from "react-native";
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
      backgroundColor: Theme.palette.base,
      width: Spacing.width,
      height: Spacing.height,
      paddingVertical: Spacing.paddingVertical,
      alignItems: "center",
    },
    children: {
      width: Spacing.width,
      height: Spacing.height,
      justifyContent: "center",
      paddingHorizontal: Spacing.paddingHorizontal
    },
    header: {
      width: Spacing.width,
      height: "40%",
      backgroundColor: Theme.palette.primary,
      alignItems: "center",
      position: "absolute",
    },
    icon: {
      marginTop: Spacing.marginVertical,
      fontSize: 100,
      color: Theme.palette.text
    },
  })

  /** ------------------------------------------------------------------------------------------------------------------
   * Component
   ------------------------------------------------------------------------------------------------------------------*/
  return (
    <SafeAreaView>
      <ScrollView
        keyboardDismissMode={"interactive"}
        onScroll={(e: any) => console.log(e)}
        keyboardShouldPersistTaps={"handled"}
        style={{backgroundColor: Theme.palette.base}}
        contentContainerStyle={combineStyles(defaultStyles.page, props.styleView)}>
        <View style={defaultStyles.header}>
          <Ionicons name={props.icon} style={defaultStyles.icon}/>
        </View>
        <View style={defaultStyles.children}>
          {props.children}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}