import React, {useContext} from "react";
import {Image, ScrollView, StyleSheet} from "react-native";
import {ThemeContext} from "../../oraganisms/ThemeProvider";
import {NativeStackScreenProps} from "react-native-screens/native-stack";
import Spacing from "../../styles/Spacing";
import Title from "../../atoms/Title";
import ButtonText from "../../atoms/ButtonText";
import NavigationPages from "../../navigators/NavigationPages";

type Props = NativeStackScreenProps<any>;

export default function WelcomePage({navigation}: Props): JSX.Element {
  /** ------------------------------------------------------------------------------------------------------------------
   * Setup
   ------------------------------------------------------------------------------------------------------------------*/

  const Theme = useContext(ThemeContext)

  const defaultStyles = StyleSheet.create({
    view: {
      width: Spacing.width,
      paddingVertical: "20%",
      paddingHorizontal: Spacing.paddingHorizontal,
      height: Spacing.height,
      backgroundColor: Theme.palette.primary,
      alignContent: "center",
      textAlign: "center",
    },
    image: {
      width: "100%",
      height: "40%",
    },
  })

  /** ------------------------------------------------------------------------------------------------------------------
   * Component
   ------------------------------------------------------------------------------------------------------------------*/
  return (
    <ScrollView contentContainerStyle={defaultStyles.view} style={{backgroundColor: Theme.palette.primary}}>
      <Image
        style={defaultStyles.image}
        resizeMode={"contain"}
        source={require('../../../assets/icon.png')}/>
      <Title styleText={{marginBottom: Spacing.marginUnderHeader}}>
        Flat Out Management
      </Title>
      <ButtonText
        text={"Login"}
        styleView={{marginTop: "10%"}}
        onPress={() => navigation.navigate(NavigationPages.userLogin)}/>
      <ButtonText
        text={"Create Account"}
        styleView={{backgroundColor: Theme.palette.base}}
        onPress={() => navigation.navigate(NavigationPages.userCreate)}/>
    </ScrollView>
  )
}