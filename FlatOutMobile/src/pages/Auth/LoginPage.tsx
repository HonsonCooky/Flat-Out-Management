import React from "react";
import ThemedPageCentered from "../../oraganisms/ThemedPageCentered";
import Input from "../../atoms/Input";
import FloatingCard from "../../oraganisms/FloatingCard";
import ButtonText from "../../atoms/ButtonText";
import {Text} from "react-native";
import {NativeStackScreenProps} from "react-native-screens/native-stack";
import Spacing from "../../styles/Spacing";
import Font from "../../styles/Font";
import NavigationPages from "../../navigators/NavigationPages";

type Props = NativeStackScreenProps<any>;

export default function LoginPage({navigation}: Props): JSX.Element {

  /** ------------------------------------------------------------------------------------------------------------------
   * Functionality
   ------------------------------------------------------------------------------------------------------------------*/


  /** ------------------------------------------------------------------------------------------------------------------
   * Component
   ------------------------------------------------------------------------------------------------------------------*/

  return (
    <ThemedPageCentered icon={'person-circle-outline'}>
      <FloatingCard cardTitle={"Login"}>
        <Input // Username
          placeholder={"Email / Username"}
          onChangeText={(s) => console.log(s)}
        />

        <Input // Password
          placeholder={"Password"}
          onChangeText={(s) => console.log(s)}/>

        <ButtonText
          text={"Login"}
          icon={"log-in-sharp"}
          onPress={() => console.log("HERE")}
          styleView={{marginTop: "10%"}}
        />

        <Text
          onPress={() => {
            navigation.pop()
            navigation.navigate(NavigationPages.createUser)
          }}
          style={{
            fontSize: Font.size.S,
            fontFamily: Font.family(Font.fontFamilies.scpB),
            textAlign: "center",
            marginTop: Spacing.marginVertical,
          }}
        >
          Create Account?
        </Text>
      </FloatingCard>
    </ThemedPageCentered>
  )
}