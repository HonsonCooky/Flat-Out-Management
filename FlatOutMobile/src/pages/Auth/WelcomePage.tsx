import React, {useContext} from "react";
import {Image, ScrollView, StyleSheet} from "react-native";
import {ThemeContext} from "../../oraganisms/ThemeProvider";
import {NativeStackScreenProps} from "react-native-screens/native-stack";
import Spacing from "../../styles/Spacing";
import Title from "../../atoms/Title";

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
      height: "40%",
    },
    loginBtn: {

    }
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
      {/*<ButtonText*/}
      {/*  text={"Login"}*/}
      {/*  styleText={defaultStyles.loginBtn}*/}
      {/*  onPress={() => navigation.navigate('Login')}/>*/}
    </ScrollView>
  )
}