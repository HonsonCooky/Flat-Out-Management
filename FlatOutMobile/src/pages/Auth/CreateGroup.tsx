import React, {useEffect, useState} from "react";
import {NativeStackScreenProps} from "react-native-screens/native-stack";
import ThemedPageCentered from "../../oraganisms/ThemedPageCentered";
import FloatingCard from "../../oraganisms/FloatingCard";
import DropDown from "../../atoms/DropDown";
import {getGroupNames} from "../../services/GroupManagement";
import {StyleSheet, Text} from "react-native";
import Font from "../../styles/Font";
import Palette from "../../styles/Palette";
import Spacing from "../../styles/Spacing";
import ButtonText from "../../atoms/ButtonText";
import Input from "../../atoms/Input";
import NavigationPages from "../../navigators/NavigationPages";

type Props = NativeStackScreenProps<any>;

export default function CreateGroup({navigation}: Props): JSX.Element {
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
  const [groups, setGroups] = useState(["Loading Groups..."])
  const [selectedGroup, setSelectedGroup] = useState(0)

  // Get the pre-existing groups
  useEffect(
    () => {
      getGroupNames().then(res => {
        if (res.length > 0) setGroups(["\< Select Group\>", ...res])
        else setGroups(["No groups exist"])
      })
    }, []
  )

  /** ------------------------------------------------------------------------------------------------------------------
   * Component
   ------------------------------------------------------------------------------------------------------------------*/

  return (
    <ThemedPageCentered icon={"people-circle-outline"}>
      <FloatingCard
        cardTitle={"Join Group"}
        styleView={{marginBottom: "10%"}}
      >
        <Text style={defaultStyles.subtitle}>Join a pre-existing group</Text>
        <>
          <DropDown
            selectedValue={groups[selectedGroup]}
            onValueChange={(itemValue, itemIndex) => setSelectedGroup(itemIndex)}
            items={groups}
          />
          <ButtonText
            onPress={() => navigation.navigate(NavigationPages.groupLogin)}
            text={"Join"}
            icon={'add-outline'}
            styleView={{marginTop: "5%"}}
          />
        </>
      </FloatingCard>
      <FloatingCard
        cardTitle={"Create Group"}
        styleView={{marginBottom: "20%"}}
      >
        <Text style={defaultStyles.subtitle}>Create a new group</Text>
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