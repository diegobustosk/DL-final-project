import React, { useContext } from "react";
import userContext from "../context/userContext";

function Login() {
  const user = useContext(userContext);

  return (
    <div>
      Login
      <h2>{user.name}</h2>
    </div>
  );
}

export default Login;
