import React from "react";
import {NativeStackScreenProps} from "react-native-screens/native-stack";
import ThemedPageCentered from "../../oraganisms/ThemedPageCentered";
import FloatingCard from "../../oraganisms/FloatingCard";
import DropDown from "../../atoms/DropDown";

type Props = NativeStackScreenProps<any>;

export default function CreateGroup({navigation}: Props): JSX.Element {

  // const [groups, setGroups] = useState()
  //
  // if (!groups) return (<LoadingPage assistanceText={"Getting Groups..."}/>)

  return (
    <ThemedPageCentered icon={"people-circle-outline"}>
      <FloatingCard cardTitle={"Create Group"}>
        <DropDown
          selectedValue={"Harrison"}
          onValueChange={(itemValue, itemIndex) => console.log(itemValue, itemIndex)}
          groups={[{groupName: "Ira Street"}]}
        />
      </FloatingCard>
    </ThemedPageCentered>
  )
}