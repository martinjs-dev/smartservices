// import React from 'react';
// import PropTypes from 'prop-types';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  const token = localStorage.getItem('smart_access');

  return token ? <Outlet /> : <Navigate to="/login" />;

};


export default PrivateRoute;
