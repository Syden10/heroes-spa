import { render, screen } from '@testing-library/react';
import { AuthContext } from '../../../src/auth';
import { MemoryRouter } from 'react-router-dom';
import { AppRouter } from '../../../src/router';

describe('<AppRouter/> tests', () => {
  test('should render login if user is logged out ', () => {
    const contextValue = {
      logged: false,
    };
    render(
      <MemoryRouter initialEntries={['/marvel']}>
        <AuthContext.Provider value={contextValue}>
          <AppRouter />
        </AuthContext.Provider>
      </MemoryRouter>
    );

    expect(screen.getAllByText('Login').length).toBe(2);
  });

  test('should return marvel if logged in', () => {
    const contextValue = {
      logged: true,
      user: {
        name: 'Sky P',
        id: '222',
      },
    };
    render(
      <MemoryRouter initialEntries={['/marvel']}>
        <AuthContext.Provider value={contextValue}>
          <AppRouter />
        </AuthContext.Provider>
      </MemoryRouter>
    );
    // screen.debug();
    expect(screen.getAllByText('Marvel').length).toBeGreaterThanOrEqual(1);
  });
});
