import React from 'react';
import Router from "./src/navigators/Router";
import AppLoadingPlaceholder from "expo/build/launch/AppLoadingPlaceholder";
import {loadFonts} from "./src/styles/Font";
import ThemeProvider from "./src/oraganisms/ThemeProvider"

export default function App() {
  const [fontsLoaded, error] = loadFonts()
  if (!fontsLoaded || error) return <AppLoadingPlaceholder/>
  return (
    <ThemeProvider>
      <Router/>
    </ThemeProvider>
  );
}