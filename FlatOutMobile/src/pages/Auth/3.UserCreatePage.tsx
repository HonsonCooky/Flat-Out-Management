import React, {useContext, useState} from "react";
import ThemedPageCentered from "../../oraganisms/ThemedPageCentered";
import FloatingCard from "../../oraganisms/FloatingCard";
import Input from "../../atoms/Input";
import ButtonText from "../../atoms/ButtonText";
import {NativeStackScreenProps} from "react-native-screens/native-stack";
import WrongScreenButton from "../../atoms/WrongScreenButton";
import navigationPages from "../../navigators/NavigationPages";
import LoadingPage from "../LoadingPage";
import {UserContext} from "../../oraganisms/UserProvider";

type Props = NativeStackScreenProps<any>;

export default function UserCreatePage(props: Props): JSX.Element {

  /** ------------------------------------------------------------------------------------------------------------------
   * Setup
   ------------------------------------------------------------------------------------------------------------------*/
  const [creating, setCreating] = useState<boolean>(false)
  const [errorMsg, setErrorMsg] = useState<string>("")

  const [email, setEmail] = useState<string>("")
  const [username, setUsername] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [confirmPassword, setConfirmPassword] = useState<string>("")

  const user = useContext(UserContext)

  /** ------------------------------------------------------------------------------------------------------------------
   * Functionality
   ------------------------------------------------------------------------------------------------------------------*/

  const createUser = async(): Promise<boolean> => {
    if (password != confirmPassword) return false

    return true
  }

  /** ------------------------------------------------------------------------------------------------------------------
   * Component
   ------------------------------------------------------------------------------------------------------------------*/
  if (creating) return <LoadingPage assistanceText={"Setting up account..."}/>

  console.log(user.online)
  return (
    <ThemedPageCentered icon={'person-circle-outline'}>
      <FloatingCard cardTitle={"Create User"}>
        <Input // Email
          placeholder={"Email"}
          onChangeText={(s) => setEmail(s)}
        />

        <Input // Username
          placeholder={"Username"}
          onChangeText={(s) => setUsername(s)}
        />

        <Input // Password
          secureTextEntry={true}
          placeholder={"Password"}
          onChangeText={(s) => setPassword(s)}/>

        <Input // Password
          secureTextEntry={true}
          placeholder={"Confirm Password"}
          onChangeText={(s) => setConfirmPassword(s)}/>

        <ButtonText
          text={"Next"}
          icon={"chevron-forward-outline"}
          onPress={() => {
            createUser().then()

            // props.navigation.navigate(NavigationPages.welcomeNewUser)
          }}
          styleView={{marginTop: "10%"}}
        />

        <WrongScreenButton linkPage={navigationPages.userLogin} nav={props}>
          Login?
        </WrongScreenButton>
      </FloatingCard>
    </ThemedPageCentered>
  )
}