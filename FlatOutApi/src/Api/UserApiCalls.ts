import {app} from "../index";

/**
 * UserInterface: Not to be confused with a UI, the UserApiCalls.ts contains one function for calling and handling
 * (parsing handling to middleware) UserManagement functions. In a nutshell, it is the EXPRESS interface setup,
 * relaying calls to the Mongoose backend in /Management/UserManagement.ts
 */
export function initializeUserInterface() {
  app.post("/post/user/create")
  app.post("/post/user/login")
  app.post("/post/user/update")
  app.post("/post/user/delete")
}
