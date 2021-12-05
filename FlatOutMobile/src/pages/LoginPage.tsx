import React from "react";
import ThemedPageCentered from "../templates/ThemedPageCentered";
import Input from "../components/Input";
import Font from "../styles/Font";
import Button from "../components/Button";

export default function LoginPage(): JSX.Element {
  return (
    <ThemedPageCentered>
      <Input // Username
        styleText={{fontSize: Font.size.L}}
        placeHolder={"Username"}
        onChangeText={(s) => console.log(s)}/>

      <Input // Password
        styleText={{fontSize: Font.size.L}}
        placeHolder={"Password"}
        onChangeText={(s) => console.log(s)}/>

      <Button onPress={()=> console.log("Here")} text={"Login Now"}/>
    </ThemedPageCentered>
  )
}