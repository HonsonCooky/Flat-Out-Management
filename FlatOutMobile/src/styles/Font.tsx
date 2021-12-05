import {useFonts} from "expo-font";
import * as SCP from "@expo-google-fonts/source-code-pro";
import * as SSP from "@expo-google-fonts/source-sans-pro";

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

  sspXL: SSP.SourceSansPro_200ExtraLight,
  sspXLI: SSP.SourceSansPro_200ExtraLight_Italic,
  sspL: SSP.SourceSansPro_300Light,
  sspLI: SSP.SourceSansPro_300Light_Italic,
  sspR: SSP.SourceSansPro_400Regular,
  sspRI: SSP.SourceSansPro_400Regular_Italic,
  sspSB: SSP.SourceSansPro_600SemiBold,
  sspSBI: SSP.SourceSansPro_600SemiBold_Italic,
  sspB: SSP.SourceSansPro_700Bold,
  sspBI: SSP.SourceSansPro_700Bold_Italic,
  sspBl: SSP.SourceSansPro_900Black,
  sspBlI: SSP.SourceSansPro_900Black_Italic
}

export const loadFonts = () => {
  return useFonts(FontFamilies)
}

export default {
  size: {
    XS: 8,
    S: 16,
    M: 24,
    L: 32,
    XL: 46,
    XXL: 52,
  },
  fontFamilies: FontFamilies,
  family: (font: number) => Object.keys(FontFamilies)[font - FontFamilies.scpXL]
}