import React from "react";
import { Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ element: Element, ...rest }) => {
  const isAuth = useSelector((state) => state.auth.isAuth);

  return (
    <Route
      {...rest}
      element={isAuth ? <Element /> : <Navigate to="/login" />}
    />
  );
};

export default PrivateRoute;
