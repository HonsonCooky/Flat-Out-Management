import React from 'react';
import Router from "./src/navigators/Router";
import AppLoadingPlaceholder from "expo/build/launch/AppLoadingPlaceholder";
import {loadFonts} from "./src/styles/Font";
import ThemeProvider from "./src/oraganisms/ThemeProvider"
import {SafeAreaView} from "react-native";
import Spacing from "./src/styles/Spacing";

export default function App() {
  const [fontsLoaded, error] = loadFonts()
  if (!fontsLoaded || error) return <AppLoadingPlaceholder/>
  return (
    <ThemeProvider>
      <SafeAreaView style={{width: Spacing.width, height: Spacing.height}}>
        <Router/>
      </SafeAreaView>
    </ThemeProvider>
  );
}