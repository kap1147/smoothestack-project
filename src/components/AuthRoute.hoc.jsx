import React from "react";
// Npm
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

export default function AuthRoute({ component: Component, ...rest }) {
  const { isAuthenticated } = useSelector((state) => state.user);
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <Component {...props}> </Component>
        ) : (
          <Redirect to="/landing" />
        )
      }
    />
  );
}
