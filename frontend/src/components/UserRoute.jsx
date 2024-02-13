import React from "react";
import { Route, redirect } from "react-router-dom";
import isAuthenticated from "../helpers/auth";

function UserRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => {
        isAuthenticated() && isAuthenticated().role === 2 ? (
          <Component {...props} />
        ) : (
          <Navigate to="/login" />
        );
      }}
    />
  );
}

export default UserRoute;
