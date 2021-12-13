import React from "react";
import ThemedPageCentered from "../../oraganisms/ThemedPageCentered";
import FloatingCard from "../../oraganisms/FloatingCard";
import Input from "../../atoms/Input";
import ButtonText from "../../atoms/ButtonText";
import {NativeStackScreenProps} from "react-native-screens/native-stack";
import NavigationPages from "../../navigators/NavigationPages";
import WrongScreenButton from "../../atoms/WrongScreenButton";
import navigationPages from "../../navigators/NavigationPages";

type Props = NativeStackScreenProps<any>;

export default function UserCreatePage(props: Props): JSX.Element {

  /** ------------------------------------------------------------------------------------------------------------------
   * Component
   ------------------------------------------------------------------------------------------------------------------*/
  return (
    <ThemedPageCentered icon={'person-circle-outline'}>
      <FloatingCard cardTitle={"Create User"}>
        <Input // Email
          placeholder={"Email"}
          onChangeText={(s) => console.log(s)}
        />

        <Input // Username
          placeholder={"Username"}
          onChangeText={(s) => console.log(s)}
        />

        <Input // Password
          placeholder={"Password"}
          onChangeText={(s) => console.log(s)}/>

        <Input // Password
          placeholder={"Confirm Password"}
          onChangeText={(s) => console.log(s)}/>

        <ButtonText
          text={"Next"}
          icon={"chevron-forward-outline"}
          onPress={() => props.navigation.navigate(NavigationPages.welcomeNewUser)}
          styleView={{marginTop: "10%"}}
        />

        <WrongScreenButton linkPage={navigationPages.userLogin} nav={props}>
          Login?
        </WrongScreenButton>
      </FloatingCard>
    </ThemedPageCentered>
  )
}