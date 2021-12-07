import React, {createContext} from "react";
import IWithChildren from "../utils/IWithChildren";

/** ----------------------------------------------------------------------------------------------------------------
 * Setup
 ---------------------------------------------------------------------------------------------------------------- */
interface User {
  authenticated: boolean,
}

export const UserContext = createContext({
  authenticated: false,
})

/** ----------------------------------------------------------------------------------------------------------------
 * Provider
 ---------------------------------------------------------------------------------------------------------------- */
export default function UserProvider(props: IWithChildren): JSX.Element {

  const defaultUser: User = {
    authenticated: false
  }

  return (
    <UserContext.Provider value={defaultUser}>
      {props.children}
    </UserContext.Provider>
  )
}