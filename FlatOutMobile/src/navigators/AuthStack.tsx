import React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import LoginPage from "../pages/LoginPage";
import StackHeader from "../templates/StackHeader";
import WelcomePage from "../pages/WelcomePage";

/** ------------------------------------------------------------------------------------------------------------------
 * Setup
 ------------------------------------------------------------------------------------------------------------------*/
const Stack = createStackNavigator()

/** ------------------------------------------------------------------------------------------------------------------
 * Navigator
 ------------------------------------------------------------------------------------------------------------------*/
export default function AuthStack(): JSX.Element {
  return (
    <Stack.Navigator initialRouteName={"Welcome"} screenOptions={StackHeader()}>
      <Stack.Screen name={"Welcome"} component={WelcomePage}/>
      <Stack.Screen name={"Login"} component={LoginPage}/>
      <Stack.Screen name={"Signup"} component={LoginPage}/>
    </Stack.Navigator>
  )
}

