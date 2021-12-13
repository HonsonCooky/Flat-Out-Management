import React from "react";
import {NativeStackScreenProps} from "react-native-screens/native-stack";
import ThemedPageCentered from "../../oraganisms/ThemedPageCentered";
import FloatingCard from "../../oraganisms/FloatingCard";
import {StyleSheet} from "react-native";
import Font from "../../styles/Font";
import Palette from "../../styles/Palette";
import Spacing from "../../styles/Spacing";
import ButtonText from "../../atoms/ButtonText";
import Input from "../../atoms/Input";

type Props = NativeStackScreenProps<any>;

export default function GroupCreatePage({navigation}: Props): JSX.Element {
  /** ------------------------------------------------------------------------------------------------------------------
   * Setup
   ------------------------------------------------------------------------------------------------------------------*/

  const defaultStyles = StyleSheet.create({
    subtitle: {
      fontSize: Font.size.SM,
      fontFamily: Font.family(Font.fontFamilies.latoRI),
      marginVertical: Spacing.marginVertical
    },
    errorText: {
      color: Palette.constant.failure,
      textAlign: "center",
      fontFamily: Font.family(Font.fontFamilies.scpB)
    }
  })

  /** ------------------------------------------------------------------------------------------------------------------
   * Functionality
   ------------------------------------------------------------------------------------------------------------------*/

  /** ------------------------------------------------------------------------------------------------------------------
   * Component
   ------------------------------------------------------------------------------------------------------------------*/

  return (
    <ThemedPageCentered icon={"people-circle-outline"}>
      <FloatingCard
        cardTitle={"Create Group"}
      >
        <Input // Groupname
          placeholder={"Group Name"}
          onChangeText={(s) => console.log(s)}
        />

        <Input // Password
          placeholder={"Password"}
          onChangeText={(s) => console.log(s)}/>

        <Input // Password
          placeholder={"Confirm Password"}
          onChangeText={(s) => console.log(s)}/>

        <ButtonText
          text={"Create"}
          onPress={() => console.log("Create Group")}
          icon={"folder-outline"}
          styleView={{marginTop: "10%"}}/>
      </FloatingCard>

    </ThemedPageCentered>
  )
}