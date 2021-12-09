import React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import LoginPage from "../pages/Auth/LoginPage";
import WelcomePage from "../pages/Auth/WelcomePage";
import SignupPage from "../pages/Auth/SignupPage";
import {TransitionSpec} from "@react-navigation/stack/lib/typescript/src/types";

/** ------------------------------------------------------------------------------------------------------------------
 * Setup
 ------------------------------------------------------------------------------------------------------------------*/
const Stack = createStackNavigator()

const config:  TransitionSpec = {
  animation: 'spring',
  config: {
    stiffness: 1000,
    damping: 500,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};

/** ------------------------------------------------------------------------------------------------------------------
 * Navigator
 ------------------------------------------------------------------------------------------------------------------*/
export default function AuthStack(): JSX.Element {
  return (
    <Stack.Navigator initialRouteName={"Welcome"} screenOptions={{
      headerShown: false,
      transitionSpec: {open: config, close: config,}
    }}>
      <Stack.Screen name={"Welcome"} component={WelcomePage}/>
      <Stack.Screen name={"Login"} component={LoginPage}/>
      <Stack.Screen name={"Signup"} component={SignupPage}/>
    </Stack.Navigator>
  )
}

