import {app} from "../index";
import {userCreate, userDelete, userLogin, userUpdate} from "../Management/UserManagement";
import {FOMRes} from "../_Interfaces";

/**
 * UserInterface: Not to be confused with a UI, the UserInterface.ts contains one function for calling and handling
 * (parsing handling to middleware) UserManagement functions. In a nutshell, it is the EXPRESS interface setup,
 * relaying calls to the Mongoose backend in /Management/UserManagement.ts
 */
export function initializeUserInterface() {
  app.post("/post/user/create", (req, res, next) => {
    console.log("HERE")
    userCreate(req.body)
      .then((fomRes: FOMRes) => res.status(200).send(fomRes))
      .catch(e => next(e))
  })

  app.post("/post/user/login", (req, res, next) => {
    userLogin(req.body)
    .then((fomRes: FOMRes) => res.status(200).send(fomRes))
    .catch(e => next(e))
  })

  app.post("/post/user/update", (req, res, next) => {
    userUpdate(req.body)
    .then((fomRes: FOMRes) => res.status(200).send(fomRes))
    .catch(e => next(e))
  })

  app.post("/post/user/delete", (req, res, next) => {
    userDelete(req.body)
      .then((fomRes: FOMRes) => res.status(200).send(fomRes))
      .catch(e => next(e))
  })
}
