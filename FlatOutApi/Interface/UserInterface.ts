import {app} from "../index";
import {userCreate, userLogin} from "../Management/UserManagement";

/**
 * UserInterface: Not to be confused with a UI, the UserInterface.ts contains one function for calling and handling
 * (parsing handling to middleware) UserManagement functions. In a nutshell, it is the EXPRESS interface setup,
 * relaying calls to the Mongoose backend in /Management/UserManagement.ts
 */
export function initializeUserInterface() {
  app.post("/post/user/create", (req, res, next) => {
    userCreate(req.body)
      .then((user) => res.status(200).send(user))
      .catch(e => next(e))
  })

  app.get("/get/user/login", (req: any, res: any, next: any) => {
    userLogin(req.body)
      .then((user) => res.status(200).send(user))
      .catch(e => next(e))
  })
}