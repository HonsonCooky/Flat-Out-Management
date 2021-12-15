import React, {useContext} from 'react';
import Router from "./src/navigators/Router";
import {loadFonts} from "./src/styles/Font";
import LoadingPage from "./src/pages/LoadingPage";
import {UserContext} from "./src/oraganisms/UserProvider";
import {wakeUp} from "./src/services/Common";

export default function App() {
  // Wake up the Heroku dyno
  const user = useContext(UserContext)
  wakeUp(user)

  // Attempt to load fonts
  const [fontsLoaded, error] = loadFonts()
  if (!fontsLoaded && !error) return <LoadingPage/>

  // Start the app
  return <Router/>
}