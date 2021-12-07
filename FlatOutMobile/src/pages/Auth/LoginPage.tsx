import React from "react";
import ThemedPageCentered from "../../oraganisms/ThemedPageCentered";
import Input from "../../atoms/Input";
import Font from "../../styles/Font";

export default function LoginPage(): JSX.Element {

  /** ------------------------------------------------------------------------------------------------------------------
   * Component
   ------------------------------------------------------------------------------------------------------------------*/
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

    </ThemedPageCentered>
  )
}