import { fireEvent, render, screen } from '@testing-library/react';
import { AuthContext } from '../../../src/auth';
import { MemoryRouter } from 'react-router-dom';
import { Navbar } from '../../../src/ui';

const mockedUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUseNavigate,
}));

describe('<Navbar/> tests', () => {
  const contextValue = {
    logged: true,
    user: {
      name: 'Sky P',
    },
    logout: jest.fn(),
  };

  beforeAll(() => jest.clearAllMocks());

  test('should render logged in user name', () => {
    render(
      <AuthContext.Provider value={contextValue}>
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      </AuthContext.Provider>
    );

    expect(screen.getByText('Sky P')).toBeTruthy();
  });

  test('should navigate when logout button is clicked', () => {
    render(
      <AuthContext.Provider value={contextValue}>
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      </AuthContext.Provider>
    );

    const logoutBtn = screen.getByRole('button');
    fireEvent.click(logoutBtn);

    expect(contextValue.logout).toHaveBeenCalled();

    expect(mockedUseNavigate).toHaveBeenCalledWith('/login', {
      replace: true,
    });
  });
});
