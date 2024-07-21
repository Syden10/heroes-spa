import { render, screen } from '@testing-library/react';
import { AuthContext } from '../../../src/auth';
import { PublicRoute } from '../../../src/router';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

describe('<PublicRoute/> tests', () => {
  test('should return children if user is logged out', () => {
    const contextValue = {
      logged: false,
    };

    render(
      <AuthContext.Provider value={contextValue}>
        <PublicRoute>
          <h1>Public route</h1>
        </PublicRoute>
      </AuthContext.Provider>
    );
    // screen.debug();
    expect(screen.getByText('Public route')).toBeTruthy();
  });

  test('should render navigate if logged in', () => {
    const contextValue = {
      logged: true,
      user: {
        name: 'Sky P',
        id: '222',
      },
    };

    render(
      <AuthContext.Provider value={contextValue}>
        <MemoryRouter initialEntries={['/login']}>
          <Routes>
            <Route
              path='login'
              element={
                <PublicRoute>
                  <h1>Public route</h1>
                </PublicRoute>
              }
            />
            <Route path='marvel' element={<h1>Marvel</h1>} />
          </Routes>
        </MemoryRouter>
      </AuthContext.Provider>
    );

    // screen.debug();
    expect(screen.getByText('Marvel')).toBeTruthy();
  });
});
