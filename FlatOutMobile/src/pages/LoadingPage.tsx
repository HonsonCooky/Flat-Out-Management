import {ImageBackground, StyleSheet, View} from "react-native";
import Spacing from "../styles/Spacing";


export default function LoadingPage(): JSX.Element {

  const defaultStyles = StyleSheet.create({
    view: {
      width: Spacing.width,
      height: Spacing.height,
    },
    image: {

    },
    animation: {

    }
  })

  return (
    <View style={defaultStyles.view}>
      <ImageBackground source={require('../../assets/splash.png')}/>

    </View>
  )
}