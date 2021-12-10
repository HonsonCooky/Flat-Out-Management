import React from "react";
import {Text} from "react-native";
import ThemedPageCentered from "../../oraganisms/ThemedPageCentered";
import FloatingCard from "../../oraganisms/FloatingCard";
import Input from "../../atoms/Input";
import ButtonText from "../../atoms/ButtonText";
import Font from "../../styles/Font";
import Spacing from "../../styles/Spacing";
import {NativeStackScreenProps} from "react-native-screens/native-stack";
import NavigationPages from "../../navigators/NavigationPages";

type Props = NativeStackScreenProps<any>;

export default function CreateUser({navigation}: Props): JSX.Element {

  /** ------------------------------------------------------------------------------------------------------------------
   * Component
   ------------------------------------------------------------------------------------------------------------------*/
  return (
    <ThemedPageCentered icon={'create-outline'}>
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
          onPress={() => navigation.navigate(NavigationPages.createGroup)}
          styleView={{marginTop: "10%"}}
        />

        <Text
          onPress={() => {
            navigation.pop()
            navigation.navigate(NavigationPages.login)
          }}
          style={{
            fontSize: Font.size.S,
            fontFamily: Font.family(Font.fontFamilies.scpB),
            textAlign: "center",
            marginTop: Spacing.marginVertical,
          }}
        >
          Login?
        </Text>
      </FloatingCard>
    </ThemedPageCentered>
  )
}