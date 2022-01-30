import {app} from "../index";
import {userCreate, userDelete, userLogin, userUpdate} from "../Management/UserManagement";
import {handlePostCall} from "./_ApiCallHandler";

/**
 * UserInterface: Not to be confused with a UI, the UserApiCalls.ts contains one function for calling and handling
 * (parsing handling to middleware) UserManagement functions. In a nutshell, it is the EXPRESS interface setup,
 * relaying calls to the Mongoose backend in /Management/UserManagement.ts
 */
export function initializeUserInterface() {
  app.post("/post/user/create",
    (req, res, next) =>
      handlePostCall(userCreate, req, res, next))

  app.post("/post/user/login",
    (req, res, next) =>
      handlePostCall(userLogin, req, res, next))

  app.post("/post/user/update",
    (req, res, next) =>
      handlePostCall(userUpdate, req, res, next))

  app.post("/post/user/delete",
    (req, res, next) =>
      handlePostCall(userDelete, req, res, next))
}
