import React, {useContext} from "react";
import {ImageBackground, StyleSheet, ActivityIndicator} from "react-native";
import Spacing from "../styles/Spacing";
import {ThemeContext} from "../oraganisms/ThemeProvider";
import Font from "../styles/Font";


export default function LoadingPage(): JSX.Element {

  const Theme = useContext(ThemeContext)

  const defaultStyles = StyleSheet.create({
    image: {
      width: Spacing.width,
      height: Spacing.height,
      backgroundColor: Theme.palette.primary,
    },
    animation: {
      top: "70%",
    }
  })

  return (
    <ImageBackground source={require('../../assets/splash.png')} style={defaultStyles.image}>
      <ActivityIndicator
        style={defaultStyles.animation}
        color={Theme.palette.text}
        size={Font.size.XXL * 1.5}
      />
    </ImageBackground>
  )
}