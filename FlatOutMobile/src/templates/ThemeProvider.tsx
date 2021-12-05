import React, {createContext, useEffect, useState} from "react";
import Palette, {colorSchema} from "../styles/Palette";
import {ColorSchemeName, useColorScheme} from "react-native";
import IWithChildren from "../utils/IWithChildren";

/** ----------------------------------------------------------------------------------------------------------------
 * Setup
 ---------------------------------------------------------------------------------------------------------------- */
interface Theme {
  isDark: boolean,
  palette: colorSchema
  setScheme: (scheme: ColorSchemeName) => void
}

export const ThemeContext = createContext({
  isDark: false,
  palette: Palette.light,
  setScheme: (_: ColorSchemeName) => {}
})

/** ----------------------------------------------------------------------------------------------------------------
 * Provider
 ---------------------------------------------------------------------------------------------------------------- */
export default function ThemeProvider(props: IWithChildren): JSX.Element {
  // Get the phones color scheme
  const colorScheme = useColorScheme();

  // Dark theme management. Check the theme every render
  const [isDark, setIsDark] = useState(colorScheme === "dark")
  useEffect(() => { setIsDark(colorScheme === "dark") }, [colorScheme])

  // Create a default theme object
  const defaultTheme: Theme = {
    isDark,
    palette: isDark ? Palette.dark : Palette.light,
    setScheme: (scheme: ColorSchemeName) => {setIsDark(scheme==="dark")}
  }

  // Return the children inside with the default theme
  return (
    <ThemeContext.Provider value={defaultTheme}>
      {props.children}
    </ThemeContext.Provider>
  )
}

