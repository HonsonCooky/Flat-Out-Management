import React, {useState} from "react";
import {User, UserContext} from "../oraganisms/UserProvider";

export const URI = "https://flat-out-management-api.herokuapp.com/"


export const getRequest = async (urlExtension: string): Promise<any> => {
  const url = new URL(URI + "get/" + urlExtension)
  const response = await fetch(url.toString(),
    {
      method: "GET",
      keepalive: true,
    }
  )
  return response.json()
}

export const postRequest = async (urlExtension: string): Promise<any> => {
  const url = new URL(URI + "post/" + urlExtension)
  const response = await fetch(url.toString(),
    {
      method: "POST",
      keepalive: true,
      headers: {
        'Content-Type': 'application/json'
      }
    }
  )
  return response.json()
}

export const wakeUp = (user: User) => {
  const User = useState(UserContext)
  fetch(new URL(URI).toString())
    .then(res=> res.text())
    .then(text => console.log(text))
}