import React from "react";
import {NativeStackScreenProps} from "react-native-screens/native-stack";
import ThemedPageCentered from "../../oraganisms/ThemedPageCentered";

type Props = NativeStackScreenProps<any>;

export default function CreateGroup({navigation}: Props): JSX.Element {

  return(
    <ThemedPageCentered icon={"people-circle-outline"}>

    </ThemedPageCentered>
  )
}