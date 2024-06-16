import {
  userSlice,
  loginUser,
  logoutUser,
  registerUser,
  updateUser,
  getUser
} from '../services/slices/user-slice';
import {
  TLoginData,
  TRegisterData,
  TAuthResponse,
  TUserResponse,
  loginUserApi,
  registerUserApi,
  getUserApi,
  updateUserApi,
  logoutApi
} from '../utils/burger-api';

import { configureStore } from '@reduxjs/toolkit';

const initialState = userSlice.getInitialState();
describe('userSlice reducer', () => {
  it('тест должен обрабатывать loginUser.pending', () => {
    const action = { type: loginUser.pending.type };
    const state = userSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      isLoading: true
    });
  });

  it('тест должен обрабатывать logoutUser.pending', () => {
    const action = { type: logoutUser.pending.type };
    const state = userSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      isLoading: true
    });
  });

  it('тест должен обрабатывать registerUser.pending', () => {
    const action = { type: registerUser.pending.type };
    const state = userSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      isLoading: true
    });
  });

  it('тест должен обрабатывать updateUser.pending', () => {
    const action = { type: updateUser.pending.type };
    const state = userSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      isLoading: true
    });
  });

  it('тест должен обрабатывать getUser.pending', () => {
    const action = { type: getUser.pending.type };
    const state = userSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      isLoading: true
    });
  });
});

describe('userSlice reducer', () => {
  const mockAuthResponse = {
    accessToken: 'access-token',
    refreshToken: 'refresh-token',
    success: true,
    user: { email: 'test@example.com', name: 'Test User' }
  };

  const mockUserResponse = {
    email: 'test@example.com',
    name: 'Test User'
  };

  it('тест должен обрабатывать loginUser.fulfilled', () => {
    const action = {
      type: loginUser.fulfilled.type,
      payload: mockAuthResponse
    };
    const state = userSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      auth: mockAuthResponse,
      accept: true,
      isLoading: false,
      error: false,
      errorMessage: null
    });
  });

  it('тест должен обрабатывать logoutUser.fulfilled', () => {
    const action = { type: logoutUser.fulfilled.type };
    const state = userSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      accept: true,
      auth: null,
      user: null,
      isLoading: false,
      error: false,
      errorMessage: null
    });
  });

  it('тест должен обрабатывать registerUser.fulfilled', () => {
    const action = {
      type: registerUser.fulfilled.type,
      payload: mockAuthResponse
    };
    const state = userSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      auth: mockAuthResponse,
      accept: true,
      isLoading: false,
      error: false,
      errorMessage: null
    });
  });

  it('тест должен обрабатывать updateUser.fulfilled', () => {
    const action = {
      type: updateUser.fulfilled.type,
      payload: mockUserResponse
    };
    const state = userSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      user: mockUserResponse,
      accept: true,
      isLoading: false,
      error: false,
      errorMessage: null
    });
  });

  it('тест должен обрабатывать getUser.fulfilled', () => {
    const action = { type: getUser.fulfilled.type, payload: mockUserResponse };
    const state = userSlice.reducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      user: mockUserResponse,
      accept: true,
      isLoading: false,
      error: false,
      errorMessage: null
    });
  });
});

const store = configureStore({ reducer: userSlice.reducer });

describe('userSlice reducer', () => {
  it('тест должен проверять loginUser.rejected', () => {
    const action = { type: loginUser.rejected.type, payload: 'Login failed' };
    const state = userSlice.reducer(store.getState(), action);
    expect(state.error).toBeTruthy();
    expect(state.errorMessage).toBe('Login failed');
  });

  it('тест должен проверять logoutUser.rejected', () => {
    const action = { type: logoutUser.rejected.type, payload: 'Logout failed' };
    const state = userSlice.reducer(store.getState(), action);
    expect(state.error).toBeTruthy();
    expect(state.errorMessage).toBe('Logout failed');
  });

  it('тест должен проверять registerUser.rejected', () => {
    const action = {
      type: registerUser.rejected.type,
      payload: 'Registration failed'
    };
    const state = userSlice.reducer(store.getState(), action);
    expect(state.error).toBeTruthy();
    expect(state.errorMessage).toBe('Registration failed');
  });

  it('тест должен проверять updateUser.rejected', () => {
    const action = { type: updateUser.rejected.type, payload: 'Update failed' };
    const state = userSlice.reducer(store.getState(), action);
    expect(state.error).toBeTruthy();
    expect(state.errorMessage).toBe('Update failed');
  });

  it('тест должен проверять getUser.rejected', () => {
    const action = { type: getUser.rejected.type, payload: 'Fetch failed' };
    const state = userSlice.reducer(store.getState(), action);
    expect(state.error).toBeTruthy();
    expect(state.errorMessage).toBe('"Fetch failed"');
  });
});
