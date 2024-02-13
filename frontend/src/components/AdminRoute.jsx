import React from "react";
import { Route, redirect } from "react-router-dom";
import isAuthenticated from "../helpers/auth";

function AdminRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => {
        isAuthenticated() && isAuthenticated().role === 1 ? (
          <Component {...props} />
        ) : (
          <Navigate to="/login" />
        );
      }}
    />
  );
}

export default AdminRoute;
