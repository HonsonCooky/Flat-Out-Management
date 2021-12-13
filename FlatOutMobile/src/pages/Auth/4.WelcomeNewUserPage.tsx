import React, {useContext} from "react";
import {StyleSheet, Text} from "react-native";
import {ThemeContext} from "../../oraganisms/ThemeProvider";
import {NativeStackScreenProps} from "react-native-screens/native-stack";
import Spacing from "../../styles/Spacing";
import ButtonText from "../../atoms/ButtonText";
import NavigationPages from "../../navigators/NavigationPages";
import Font from "../../styles/Font";
import FloatingCard from "../../oraganisms/FloatingCard";
import ThemedPageCentered from "../../oraganisms/ThemedPageCentered";

type Props = NativeStackScreenProps<any>;

export default function WelcomeNewUserPage({navigation}: Props): JSX.Element {
  /** ------------------------------------------------------------------------------------------------------------------
   * Setup
   ------------------------------------------------------------------------------------------------------------------*/

  const Theme = useContext(ThemeContext)

  const defaultStyles = StyleSheet.create({
    view: {
      width: Spacing.width,
      paddingVertical: "20%",
      paddingHorizontal: Spacing.paddingHorizontal,
      height: Spacing.height,
      backgroundColor: Theme.palette.primary,
      alignContent: "center",
      textAlign: "center",
    },
    image: {
      width: "100%",
      height: "40%",
    },
    subTitle: {
      paddingHorizontal: Spacing.paddingHorizontal,
      fontFamily: Font.family(Font.fontFamilies.latoR),
      fontSize: Font.size.S + 2,
      marginBottom: "5%",
      textAlign: "justify",
    },
  })

  /** ------------------------------------------------------------------------------------------------------------------
   * Component
   ------------------------------------------------------------------------------------------------------------------*/
  return (
    <ThemedPageCentered icon={'alarm-outline'}>
      <FloatingCard cardTitle={"Welcome!"}>

        <Text style={defaultStyles.subTitle}>
          Flat Out Management aims to assist flatting groups with small tasks that can be painful to do manually.
        </Text>
        <Text style={defaultStyles.subTitle}>
          Automatic chore associations, flat shopping lists, and messaging are some of the features this application
          provides.
        </Text>
        <Text style={defaultStyles.subTitle}>
          Designed and created by those who have suffered through the pain of not having this app. Create a new group,
          join an existing group, or go it alone; down below.
        </Text>

        <ButtonText
          text={"New Group"}
          icon={"add-outline"}
          styleView={{backgroundColor: Theme.palette.base, marginTop: "10%"}}
          onPress={() => navigation.navigate(NavigationPages.groupCreate)}/>
        <ButtonText
          text={"Group Login"}
          icon={"log-in-outline"}
          onPress={() => navigation.navigate(NavigationPages.groupLogin)}/>
        <ButtonText
          text={"Going Solo"}
          icon={"person-circle-outline"}
          styleView={{backgroundColor: Theme.palette.secondary}}
          onPress={() => console.log("Create User")}/>
      </FloatingCard>
    </ThemedPageCentered>
  )
}