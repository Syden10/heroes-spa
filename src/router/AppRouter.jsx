import { Route, Routes } from 'react-router-dom';
import { HeroesRoutes } from '../heroes';
import { Login } from '../auth';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

export const AppRouter = () => {
  return (
    <>
      <Routes>
        {/* <Route
          path='login'
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        /> */}
        <Route
          path='login/*'
          element={
            <PublicRoute>
              <Routes>
                <Route path='/*' element={<Login />} />
              </Routes>
            </PublicRoute>
          }
        />
        {/* <Route path='login' element={<Login />} /> */}
        <Route
          path='/*'
          element={
            <PrivateRoute>
              <HeroesRoutes />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
};
