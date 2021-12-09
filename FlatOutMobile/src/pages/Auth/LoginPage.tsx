import React from "react";
import ThemedPageCentered from "../../oraganisms/ThemedPageCentered";
import Input from "../../atoms/Input";
import FloatingCard from "../../oraganisms/FloatingCard";
import ButtonText from "../../atoms/ButtonText";

export default function LoginPage(): JSX.Element {

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
          onChangeText={(s) => console.log(s)}/>

        <Input // Password
          placeholder={"Password"}
          onChangeText={(s) => console.log(s)}/>

        <ButtonText onPress={() => console.log("HERE")} text={"Login"} icon={"log-in-sharp"}/>
      </FloatingCard>
    </ThemedPageCentered>
  )
}