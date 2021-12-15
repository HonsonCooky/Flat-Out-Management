import React, {useContext} from "react";
import {NavigationContainer} from "@react-navigation/native";
import AppTabs from "./AppTabs";
import AuthStack from "./AuthStack";
import {UserContext} from "../oraganisms/UserProvider";
import {StatusBar} from "react-native";
import {ThemeContext} from "../oraganisms/ThemeProvider";

export default function Router(): JSX.Element {

  /** ------------------------------------------------------------------------------------------------------------------
   * Setup
   ------------------------------------------------------------------------------------------------------------------*/
  const Theme = useContext(ThemeContext)
  const User = useContext(UserContext)
  /** ------------------------------------------------------------------------------------------------------------------
   * Navigator
   ------------------------------------------------------------------------------------------------------------------*/
  return (
    <>
      <NavigationContainer>
        {User.authenticated ? <AppTabs/> : <AuthStack/>}
      </NavigationContainer>
      <StatusBar backgroundColor={Theme.palette.primary}/>
    </>
  );
};

