import React, { useContext } from 'react';
import { Route, Navigate } from 'react-router-dom';
import UserContext from '../context/userContext';

function AdminRoute({ component: Component, ...rest }) {
  const { user } = useContext(UserContext);

  return (
    <Route
      {...rest}
      render={(props) => 
        user && user.role === 'admin' ? (
          <Component {...props} />
        ) : (
          <Navigate to="/login" />
        )
      }
    />
  );
}

export default AdminRoute;
