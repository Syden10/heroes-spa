import { MemoryRouter } from 'react-router-dom';
import { Search } from '../../../src/heroes';
import { fireEvent, render, screen } from '@testing-library/react';

const mockedUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUseNavigate,
}));

describe('<Search/> tests', () => {
  beforeAll(() => jest.clearAllMocks());

  test('should render with default values', () => {
    const { container } = render(
      <MemoryRouter>
        <Search />
      </MemoryRouter>
    );
    expect(container).toMatchSnapshot();
  });

  test('should render batman with the query-string value on the input', () => {
    render(
      <MemoryRouter initialEntries={['/search?q=batman']}>
        <Search />
      </MemoryRouter>
    );
    const input = screen.getByRole('textbox');
    expect(input.value).toBe('batman');

    const img = screen.getByRole('img');
    expect(img.src).toContain('/heroes/dc-batman.jpg');

    const alertDanger = screen.getByLabelText('alert-danger');
    expect(alertDanger.style.display).toBe('none');
  });

  test('should render error if no hero is returned', () => {
    render(
      <MemoryRouter initialEntries={['/search?q=sky-p']}>
        <Search />
      </MemoryRouter>
    );

    const alertDanger = screen.getByLabelText('alert-danger');
    expect(alertDanger.style.display).toBe('');
  });

  test('should call navigate to the searched screen', () => {
    const inputValue = 'superman';

    render(
      <MemoryRouter initialEntries={['/search']}>
        <Search />
      </MemoryRouter>
    );

    const input = screen.getByRole('textbox');
    fireEvent.change(input, {
      target: { name: 'searchText', value: inputValue },
    });

    const form = screen.getByRole('form');
    fireEvent.submit(form);

    expect(mockedUseNavigate).toHaveBeenCalledWith(`?q=${inputValue}`);
    // console.log(mockedUseNavigate.mock.calls);
  });
});
