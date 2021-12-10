import React, {useContext} from "react";
import {ImageBackground, StyleSheet, ActivityIndicator, Text} from "react-native";
import Spacing from "../styles/Spacing";
import {ThemeContext} from "../oraganisms/ThemeProvider";
import Font from "../styles/Font";

interface loadingPageProps {
  assistanceText?: string,
}

export default function LoadingPage(props: loadingPageProps): JSX.Element {

  const Theme = useContext(ThemeContext)

  const defaultStyles = StyleSheet.create({
    image: {
      width: Spacing.width,
      height: Spacing.height,
      backgroundColor: Theme.palette.primaryLight,
    },
    animation: {
      width: Spacing.width,
      height: "80%",
      marginBottom: Spacing.marginVertical,
      flexDirection: "row",
      alignItems: "flex-end",
    },
    text: {
      textAlign: "center",
      fontSize: Font.size.SM,
      fontFamily: Font.family(Font.fontFamilies.scpR)
    }
  })

  return (
    <ImageBackground source={require('../../assets/splash.png')} style={defaultStyles.image}>
      <ActivityIndicator
        style={defaultStyles.animation}
        color={Theme.palette.text}
        size={Font.size.XXL * 1.5}
      />
      <Text style={defaultStyles.text}>
        {props.assistanceText && props.assistanceText}
      </Text>
    </ImageBackground>
  )
}