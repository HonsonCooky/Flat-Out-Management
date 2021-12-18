import {useFonts} from "expo-font";
import * as SCP from "@expo-google-fonts/source-code-pro";
import * as LATO from "@expo-google-fonts/lato";

const FontFamilies = {
  scpXL: SCP.SourceCodePro_200ExtraLight,
  scpXLI: SCP.SourceCodePro_200ExtraLight_Italic,
  scpL: SCP.SourceCodePro_300Light,
  scpLI: SCP.SourceCodePro_300Light_Italic,
  scpR: SCP.SourceCodePro_400Regular,
  scpRI: SCP.SourceCodePro_400Regular_Italic,
  scpM: SCP.SourceCodePro_500Medium,
  scpMI: SCP.SourceCodePro_500Medium_Italic,
  scpSB: SCP.SourceCodePro_600SemiBold,
  scpSBI: SCP.SourceCodePro_600SemiBold_Italic,
  scpB: SCP.SourceCodePro_700Bold,
  scpBI: SCP.SourceCodePro_700Bold_Italic,
  scpBl: SCP.SourceCodePro_900Black,
  scpBlI: SCP.SourceCodePro_900Black_Italic,

  latoXL: LATO.Lato_100Thin,
  latoXLI: LATO.Lato_100Thin_Italic,
  latoL: LATO.Lato_300Light,
  latoLI: LATO.Lato_300Light_Italic,
  latoR: LATO.Lato_400Regular,
  latoRI: LATO.Lato_400Regular_Italic,
  latoB: LATO.Lato_700Bold,
  latoBI: LATO.Lato_700Bold_Italic,
  latoBl: LATO.Lato_900Black,
  latoBlI: LATO.Lato_900Black_Italic,
}

export const loadFonts = () => useFonts(FontFamilies)
export const family = (font: number) => Object.keys(FontFamilies)[font - FontFamilies.scpXL]

export default {
  size: {
    XS: 8,
    S: 16,
    SM: 20,
    M: 24,
    L: 32,
    XL: 46,
    XXL: 52,
  },
  fontFamilies: FontFamilies,
}