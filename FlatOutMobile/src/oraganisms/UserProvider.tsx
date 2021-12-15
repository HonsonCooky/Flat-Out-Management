import React, {createContext} from "react";
import IWithChildren from "../utils/IWithChildren";

/** ----------------------------------------------------------------------------------------------------------------
 * Setup
 ---------------------------------------------------------------------------------------------------------------- */
export interface User {
  online: boolean
  authenticated: boolean,
}

export const UserContext = createContext({
  online: false,
  authenticated: false,
})

/** ----------------------------------------------------------------------------------------------------------------
 * Provider
 ---------------------------------------------------------------------------------------------------------------- */
export default function UserProvider(props: IWithChildren): JSX.Element {

  const defaultUser: User = {
    online: false,
    authenticated: false
  }

  return (
    <UserContext.Provider value={defaultUser}>
      {props.children}
    </UserContext.Provider>
  )
}