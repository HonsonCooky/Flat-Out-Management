import React, {useContext} from "react";
import {createStackNavigator} from "@react-navigation/stack";
import {View} from "react-native";
import {ThemeContext} from "../oraganisms/ThemeProvider";
import Spacing from "../styles/Spacing";
import NavigationPages from "./NavigationPages";
import WelcomePage from "../pages/Auth/1.WelcomePage";
import UserLoginPage from "../pages/Auth/2.UserLoginPage";
import UserCreatePage from "../pages/Auth/3.UserCreatePage";
import WelcomeNewUserPage from "../pages/Auth/4.WelcomeNewUserPage";
import GroupLoginPage from "../pages/Auth/5.GroupLoginPage";
import GroupCreatePage from "../pages/Auth/6.GroupCreatePage";

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
      <Stack.Screen name={NavigationPages.userLogin} component={UserLoginPage}/>
      <Stack.Screen name={NavigationPages.userCreate} component={UserCreatePage}/>
      <Stack.Screen name={NavigationPages.welcomeNewUser} component={WelcomeNewUserPage}/>
      <Stack.Screen name={NavigationPages.groupCreate} component={GroupCreatePage}/>
      <Stack.Screen name={NavigationPages.groupLogin} component={GroupLoginPage}/>
    </Stack.Navigator>
  )
}

