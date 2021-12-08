import React, {useContext} from "react";
import {Image, ScrollView, StyleSheet} from "react-native";
import {ThemeContext} from "../../oraganisms/ThemeProvider";
import {NativeStackScreenProps} from "react-native-screens/native-stack";
import Spacing from "../../styles/Spacing";
import Title from "../../atoms/Title";
import ButtonText from "../../atoms/ButtonText";

type Props = NativeStackScreenProps<any>;

export default function WelcomePage({navigation}: Props): JSX.Element {
  /** ------------------------------------------------------------------------------------------------------------------
   * Setup
   ------------------------------------------------------------------------------------------------------------------*/

  const Theme = useContext(ThemeContext)

  const space = {
    width: Spacing.width,
    paddingVertical: Spacing.paddingVertical,
    paddingHorizontal: Spacing.paddingHorizontal,
  }

  const viewSpace = {
    ...space,
    height: Spacing.height,
  }

  const defaultStyles = StyleSheet.create({
    view: {
      ...viewSpace,
      backgroundColor: Theme.palette.primaryDark,
      justifyContent: "center",
      alignContent: "center",
      textAlign: "center",
    },
    image: {
      width: "100%",
      height: "25%",
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
      <Title>
        Flat Out Management
      </Title>
        <ButtonText
          text={"Login"}
          styleView={{marginTop: Spacing.marginUnderHeader}}
          onPress={() => navigation.navigate('Login')}/>
        <ButtonText
          text={"Create Account"}
          styleView={{elevation: 1, backgroundColor: Theme.palette.base}}
          onPress={() => navigation.navigate('Signup')}/>
    </ScrollView>
  )
}