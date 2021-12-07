import React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import LoginPage from "../pages/Auth/LoginPage";
import WelcomePage from "../pages/Auth/WelcomePage";

/** ------------------------------------------------------------------------------------------------------------------
 * Setup
 ------------------------------------------------------------------------------------------------------------------*/
const Stack = createStackNavigator()



/** ------------------------------------------------------------------------------------------------------------------
 * Navigator
 ------------------------------------------------------------------------------------------------------------------*/
export default function AuthStack(): JSX.Element {
  return (
    <Stack.Navigator initialRouteName={"Welcome"} screenOptions={{}}>
      <Stack.Screen name={"Welcome"} component={WelcomePage} options={{headerShown: false}}/>
      <Stack.Screen name={"Login"} component={LoginPage}/>
      <Stack.Screen name={"Signup"} component={LoginPage}/>
    </Stack.Navigator>
  )
}

