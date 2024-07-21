import { useContext } from 'react';
import { AuthContext } from '../auth/context/AuthContext';
import { Navigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

export const PrivateRoute = ({ children }) => {
  const { pathname, search } = useLocation();
  const lastPath = pathname + search;
  localStorage.setItem('lastPath', lastPath);
  const { logged } = useContext(AuthContext);
  return logged ? children : <Navigate to='./login' />;
};

PrivateRoute.propTypes = {
  children: PropTypes.any,
};
