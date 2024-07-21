import { render, screen } from '@testing-library/react';
import { AuthContext } from '../../../src/auth';
import { PrivateRoute } from '../../../src/router';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

describe('<PrivateRoute/> tests', () => {
  test('should return children if user is logged in', () => {
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
          <PrivateRoute>
            <h1>Private route</h1>
          </PrivateRoute>
        </MemoryRouter>
      </AuthContext.Provider>
    );
    expect(screen.getByText('Private route')).toBeTruthy();
  });

  test('should render login if logged out', () => {
    const contextValue = {
      logged: false,
    };

    render(
      <AuthContext.Provider value={contextValue}>
        <MemoryRouter initialEntries={['/marvel']}>
          <Routes>
            <Route
              path='marvel'
              element={
                <PrivateRoute>
                  <h1>Private route</h1>
                </PrivateRoute>
              }
            />
            <Route path='login' element={<h1>Login</h1>} />
          </Routes>
        </MemoryRouter>
      </AuthContext.Provider>
    );

    expect(screen.getByText('Login')).toBeTruthy();
  });

  test('should return children if logged in', () => {
    Storage.prototype.setItem = jest.fn();

    const contextValue = {
      logged: true,
      user: {
        name: 'Sky P',
        id: '222',
      },
    };

    render(
      <AuthContext.Provider value={contextValue}>
        <MemoryRouter initialEntries={['/search?q=superman']}>
          <PrivateRoute>
            <h1>Private route</h1>
          </PrivateRoute>
        </MemoryRouter>
      </AuthContext.Provider>
    );
    // screen.debug();
    expect(screen.getByText('Private route')).toBeTruthy();
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'lastPath',
      '/search?q=superman'
    );
  });
});
