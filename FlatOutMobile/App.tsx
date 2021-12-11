import React from 'react';
import Router from "./src/navigators/Router";
import {loadFonts} from "./src/styles/Font";
import ThemeProvider from "./src/oraganisms/ThemeProvider"
import LoadingPage from "./src/pages/LoadingPage";

export default function App() {
  const [fontsLoaded, error] = loadFonts()
  if (!fontsLoaded || error)
    return <LoadingPage/>
  return (
    <ThemeProvider>
      <Router/>
    </ThemeProvider>
  );
}