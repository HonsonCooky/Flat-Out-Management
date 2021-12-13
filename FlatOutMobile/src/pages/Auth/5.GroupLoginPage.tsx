import React, {useEffect, useState} from "react";
import ThemedPageCentered from "../../oraganisms/ThemedPageCentered";
import FloatingCard from "../../oraganisms/FloatingCard";
import {StyleSheet} from "react-native";
import DropDown from "../../atoms/DropDown";
import ButtonText from "../../atoms/ButtonText";
import NavigationPages from "../../navigators/NavigationPages";
import Font from "../../styles/Font";
import Spacing from "../../styles/Spacing";
import Palette from "../../styles/Palette";
import {getGroupNames} from "../../services/GroupManagement";
import {NativeStackScreenProps} from "react-native-screens/native-stack";
import Input from "../../atoms/Input";

type Props = NativeStackScreenProps<any>;

export default function GroupLoginPage({navigation}: Props): JSX.Element {
  /** ------------------------------------------------------------------------------------------------------------------
   * Setup
   ------------------------------------------------------------------------------------------------------------------*/

  /** ------------------------------------------------------------------------------------------------------------------
   * Functionality
   ------------------------------------------------------------------------------------------------------------------*/

  const [groups, setGroups] = useState(["Loading Groups..."])
  const [selectedGroup, setSelectedGroup] = useState(0)

  // Get the pre-existing groups
  useEffect(
    () => {
      getGroupNames().then(res => {
        if (res.length > 0) setGroups([...res])
        else setGroups(["No groups exist"])
      })
    }, []
  )

  /** ------------------------------------------------------------------------------------------------------------------
   * Component
   ------------------------------------------------------------------------------------------------------------------*/

  return (
    <ThemedPageCentered icon={'log-in-outline'}>
      <FloatingCard
        cardTitle={"Join Group"}
      >
        <DropDown
          selectedValue={groups[selectedGroup]}
          onValueChange={(itemValue, itemIndex) => setSelectedGroup(itemIndex)}
          items={groups.map(g => g.toUpperCase())}
        />

        <Input
          placeholder={"Password"}
          onChangeText={(txt: string) => console.log(txt)}
        />

        <ButtonText
          onPress={() => navigation.navigate(NavigationPages.groupLogin)}
          text={"Join"}
          icon={'add-outline'}
          styleView={{marginTop: "10%"}}
        />

      </FloatingCard>
    </ThemedPageCentered>
  )
}