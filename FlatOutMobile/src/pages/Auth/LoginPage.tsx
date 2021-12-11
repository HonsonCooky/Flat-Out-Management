import React from "react";
import ThemedPageCentered from "../../oraganisms/ThemedPageCentered";
import Input from "../../atoms/Input";
import FloatingCard from "../../oraganisms/FloatingCard";
import ButtonText from "../../atoms/ButtonText";
import {NativeStackScreenProps} from "react-native-screens/native-stack";
import WrongScreenButton from "../../atoms/WrongScreenButton";
import navigationPages from "../../navigators/NavigationPages";

type Props = NativeStackScreenProps<any>;

export default function LoginPage(props: Props): JSX.Element {

  /** ------------------------------------------------------------------------------------------------------------------
   * Functionality
   ------------------------------------------------------------------------------------------------------------------*/


  /** ------------------------------------------------------------------------------------------------------------------
   * Component
   ------------------------------------------------------------------------------------------------------------------*/

  return (
    <ThemedPageCentered icon={'log-in-outline'}>
      <FloatingCard cardTitle={"Login"}>
        <Input // Username
          placeholder={"Email / Username"}
          onChangeText={(s) => console.log(s)}
        />

        <Input // Password
          placeholder={"Password"}
          secureTextEntry={true}
          onChangeText={(s) => console.log(s)}/>

        <ButtonText
          text={"Login"}
          icon={"log-in-sharp"}
          onPress={() => console.log("HERE")}
          styleView={{marginTop: "10%"}}
        />
        <WrongScreenButton linkPage={navigationPages.createUser} nav={props}>
          Create Account?
        </WrongScreenButton>
      </FloatingCard>
    </ThemedPageCentered>
  )
}