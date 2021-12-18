export interface colorSchema {
  primary: string,
  primaryLight: string,
  primaryDark: string,
  secondary: string,
  secondaryLight: string,
  secondaryDark: string,
  base: string,
  text: string,
  placeholder: string,
  white: string,
  black: string,
}

interface IPalette {
  light: colorSchema,
  dark: colorSchema,
  constant: any,
}

const _palette: IPalette = {
  light: {
    primary: "#8c9eff",
    primaryLight: "#c0cfff",
    primaryDark: "#5870cb",
    secondary: "#ff80ab",
    secondaryLight: "#ffb2dd",
    secondaryDark: "#c94f7c",
    base: "#e5e5e5",
    text: "#2a2a2a",
    placeholder: "rgba(42,42,42,0.5)",
    white: "#fdfdfd",
    black: "#1c1c1c",
  },
  dark: {
    primary: "#8c9eff",
    primaryLight: "#c0cfff",
    primaryDark: "#5870cb",
    secondary: "#ff80ab",
    secondaryLight: "#ffb2dd",
    secondaryDark: "#c94f7c",
    base: "#969696",
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
export default _palette