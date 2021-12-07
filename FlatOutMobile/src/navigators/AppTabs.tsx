import React from "react";
import HomePage from "../pages/App/HomePage";
import {createMaterialBottomTabNavigator} from "@react-navigation/material-bottom-tabs";

const Tab = createMaterialBottomTabNavigator()
export default function AppTabs(): JSX.Element {

  /** ------------------------------------------------------------------------------------------------------------------
   * Navigator
   ------------------------------------------------------------------------------------------------------------------*/
  return (
    <Tab.Navigator initialRouteName={"Home"}>
      <Tab.Screen name={"Home"} component={HomePage}/>
    </Tab.Navigator>
  )
}