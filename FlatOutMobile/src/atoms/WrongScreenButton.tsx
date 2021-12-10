import {Text} from "react-native";
import Font from "../styles/Font";
import Spacing from "../styles/Spacing";
import React from "react";
import IOverrideStyleWithChildren from "../utils/IOverrideStyleWithChildren";
import {NativeStackScreenProps} from "react-native-screens/native-stack";

interface wrongScreenProps extends IOverrideStyleWithChildren {
  linkPage: string,
  nav:  NativeStackScreenProps<any>
}

export default function WrongScreenButton(props: wrongScreenProps): JSX.Element {
  return (
    <Text
      onPress={() => {
        props.nav.navigation.pop()
        props.nav.navigation.navigate(props.linkPage)
      }}
      style={{
        fontSize: Font.size.SM,
        fontFamily: Font.family(Font.fontFamilies.scpB),
        textAlign: "center",
        marginTop: Spacing.marginVertical,
      }}
    >
      {props.children}
    </Text>
  )
}