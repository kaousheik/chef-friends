import React from "react";
import {
  useLoginMutation,
  refetchMeQuery
} from "../generated";

export const Login = () => {
  let message = "";
  const [loginMutation, { data: datal, error: errorl }] = useLoginMutation({ refetchQueries:[refetchMeQuery()] });
  const loginfun = async () => {
    await loginMutation({
      variables: {
        email: (document.getElementById("email") as HTMLInputElement).value,
        password:(document.getElementById("password") as HTMLInputElement).value
      },
    });
    // console.log((document.getElementById("email") as HTMLInputElement).value)
    if (errorl) console.log(errorl);
  };
  
  if (datal && datal.login) {
    console.log(datal);
    localStorage.setItem("chef", datal.login);
    window.location.pathname = "user";
  }
  else {
      if(datal?.login === "") message = "Email or Password is wrong"
      else message="Enter Email and Password"
  }

  return (
    <div>
      <p>{!datal?.login && message} </p>
      <h3>Enter Email</h3>
      <input id='email' placeholder='Email here'></input>
      <h3>Enter Password</h3>
      <input id='password' placeholder='Password here'></input>
      <p>Click to continue</p>
      <button onClick={loginfun}> LOGIN </button>
    </div>
  );
};
