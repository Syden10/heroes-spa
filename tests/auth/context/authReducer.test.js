import { authReducer, types } from '../../../src/auth';

describe('authReudcer tests', () => {
  test('should return default state', () => {
    const state = authReducer({ logged: false }, {});
    expect(state).toEqual({ logged: false });
  });

  test('should should login and set user', () => {
    const action = {
      type: types.login,
      payload: {
        name: 'Sky P',
        id: '222',
      },
    };
    const state = authReducer({ logged: false }, action);
    expect(state).toEqual({
      user: action.payload,
      logged: true,
    });
  });

  test('should logout, remove user and return logged false', () => {
    const state = {
      logged: true,
      user: {
        id: '222',
        name: 'Sky Z',
      },
    };

    const action = {
      type: types.logout,
    };

    const newState = authReducer(state, action);

    expect(newState).toEqual({ logged: false });
  });

  // const initialState = [
  //   {
  //     logged: false,
  //     user: null,
  //   },
  // ];

  // test('should return default state', () => {
  //   const newState = authReducer(initialState, {});
  //   expect(newState).toEqual(initialState);
  // });

  // test('should login and return the user', () => {
  //   const action = {
  //     type: types.login,
  //     payload: {
  //       user: 'Sky B',
  //       logged: true,
  //     },
  //   };
  //   const newState = authReducer(initialState, action);
  //   expect(newState.logged).toBeTruthy;
  //   expect(newState.user).toEqual(action.payload);
  // });

  // test('should logout and remove user and return logged false', () => {
  //   const action = {
  //     type: types.logout,
  //     payload: {
  //       user: null,
  //       logged: false,
  //     },
  //   };
  //   const newState = authReducer(initialState, action);
  //   expect(newState.logged).toBeFalsy;
  //   expect(newState.user).toBeNull;
  // });
});
