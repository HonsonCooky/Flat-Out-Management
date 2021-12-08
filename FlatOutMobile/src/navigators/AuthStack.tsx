import React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import LoginPage from "../pages/Auth/LoginPage";
import WelcomePage from "../pages/Auth/WelcomePage";
import SignupPage from "../pages/Auth/SignupPage";

/** ------------------------------------------------------------------------------------------------------------------
 * Setup
 ------------------------------------------------------------------------------------------------------------------*/
const Stack = createStackNavigator()



/** ------------------------------------------------------------------------------------------------------------------
 * Navigator
 ------------------------------------------------------------------------------------------------------------------*/
export default function AuthStack(): JSX.Element {
  return (
    <Stack.Navigator initialRouteName={"Welcome"} screenOptions={{headerShown: false}}>
      <Stack.Screen name={"Welcome"} component={WelcomePage}/>
      <Stack.Screen name={"Login"} component={LoginPage}/>
      <Stack.Screen name={"Signup"} component={SignupPage}/>
    </Stack.Navigator>
  )
}

