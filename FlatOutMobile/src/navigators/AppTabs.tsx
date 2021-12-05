import React from "react";
import HomePage from "../pages/HomePage";
import {createMaterialBottomTabNavigator} from "@react-navigation/material-bottom-tabs";

const Tab = createMaterialBottomTabNavigator()
export default function AppTabs(): JSX.Element {
  return (
    <Tab.Navigator initialRouteName={"Home"}>
      <Tab.Screen name={"Home"} component={HomePage}/>
    </Tab.Navigator>
  )
}