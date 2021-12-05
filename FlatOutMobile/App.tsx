import React, {useEffect, useState} from 'react';
import Router from "./src/navigators/Router";
import {StatusBar} from "expo-status-bar";
import AppLoadingPlaceholder from "expo/build/launch/AppLoadingPlaceholder";
import {loadFonts} from "./src/styles/Font";
import ThemeProvider from "./src/templates/ThemeProvider"

export default function App() {
  const [isNavBarSet, setIsNavBarSet] = useState(false)
  const [fontsLoaded, error] = loadFonts()
  if (!fontsLoaded || error) return <AppLoadingPlaceholder/>

  useEffect(() => {
    setIsNavBarSet(true)
  }, [isNavBarSet])

  return (
    <ThemeProvider>
      <Router/>
      <StatusBar/>
    </ThemeProvider>
  );
}