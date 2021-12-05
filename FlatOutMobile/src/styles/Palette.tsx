import {ColorValue} from "react-native";

export interface colorSchema {
  primary: ColorValue,
  secondary: ColorValue,
  accent: ColorValue,
  accentLight: ColorValue,
  base: ColorValue,
  text: ColorValue,
  placeholder: ColorValue,
  white: ColorValue,
  black: ColorValue,
}

interface IPalette {
  light: colorSchema,
  dark: colorSchema,
  constant: any,
}

const Palette: IPalette = {
  light: {
    primary: "#938F43",
    secondary: "#90CDC3",
    accent: "#AF8C72",
    accentLight: "#F3CBBD",
    base: "#FBECDB",
    text: "#2a2a2a",
    placeholder: "rgba(42,42,42,0.5)",
    white: "#fafafa",
    black: "#1c1c1c",
  },
  dark: {
    primary: "#938F43",
    secondary: "#90CDC3",
    accent: "#AF8C72",
    accentLight: "#F3CBBD",
    base: "#FBECDB",
    text: "#eaeaea",
    placeholder: "#eaeaea",
    white: "#1c1c1c",
    black: "#e8e8e8",
  },
  constant: {
    success: "#79ea00",
    failure: "#f44336",
  },
}
export default Palette