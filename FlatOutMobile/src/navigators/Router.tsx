import React from "react";
import {NavigationContainer} from "@react-navigation/native";
import AppTabs from "./AppTabs";
import AuthStack from "./AuthStack";
import {UserContext} from "../templates/UserProvider";

export default function Router(): JSX.Element {
  return (
    <UserContext.Consumer>
      {value => (
        <NavigationContainer>
          {value.authenticated ? <AppTabs/> : <AuthStack/>}
        </NavigationContainer>
      )}
    </UserContext.Consumer>
  );
};

