import React, {useContext} from "react";
import {createStackNavigator} from "@react-navigation/stack";
import LoginPage from "../pages/Auth/LoginPage";
import WelcomePage from "../pages/Auth/WelcomePage";
import CreateUser from "../pages/Auth/CreateUser";
import {View} from "react-native";
import {ThemeContext} from "../oraganisms/ThemeProvider";
import Spacing from "../styles/Spacing";
import NavigationPages from "./NavigationPages";
import CreateGroup from "../pages/Auth/CreateGroup";
import GroupLoginPage from "../pages/Auth/GroupLoginPage";

/** ------------------------------------------------------------------------------------------------------------------
 * Setup
 ------------------------------------------------------------------------------------------------------------------*/
const Stack = createStackNavigator()

/** ------------------------------------------------------------------------------------------------------------------
 * Navigator
 ------------------------------------------------------------------------------------------------------------------*/
export default function AuthStack(): JSX.Element {

  const Theme = useContext(ThemeContext)

  const overlay = () => (
    <View style={{width: Spacing.width, height: Spacing.height, backgroundColor: Theme.palette.primary}}/>
  )

  return (
    <Stack.Navigator
      initialRouteName={NavigationPages.welcome}
      screenOptions={{headerShown: false, cardOverlay: overlay}}>
      <Stack.Screen name={NavigationPages.welcome} component={WelcomePage}/>
      <Stack.Screen name={NavigationPages.login} component={LoginPage}/>
      <Stack.Screen name={NavigationPages.createUser} component={CreateUser}/>
      <Stack.Screen name={NavigationPages.createGroup} component={CreateGroup}/>
      <Stack.Screen name={NavigationPages.groupLogin} component={GroupLoginPage}/>
    </Stack.Navigator>
  )
}

