import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
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
} from '../../utils/burger-api';

import { setCookie } from '../../utils/cookie';

export interface UserState {
  auth: TAuthResponse | null;
  user: TUserResponse | null;
  accept: boolean;
  error: boolean;
  errorMessage: string | null;
  isLoading: boolean;
}

const initialState: UserState = {
  auth: null,
  user: null,
  accept: false,
  error: false,
  errorMessage: null,
  isLoading: false
};

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (userData: TLoginData, thunkAPI) => {
    const response = await loginUserApi(userData);
    return response;
  }
);
export const logoutUser = createAsyncThunk(
  'user/logoutUser',
  async (_, thunkAPI) => {
    const response = await logoutApi();
    return response;
  }
);
export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (userData: TRegisterData, thunkAPI) => {
    const response = await registerUserApi(userData);
    return response;
  }
);
export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (userData: TRegisterData, thunkAPI) => {
    const response = await updateUserApi(userData);
    return response;
  }
);
export const getUser = createAsyncThunk('user/getUser', async (_, thunkAPI) => {
  const response = await getUserApi();
  return response;
});
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        registerUser.fulfilled,
        (state, action: PayloadAction<TAuthResponse>) => {
          state.auth = action.payload;
          state.accept = true;
          state.isLoading = false;
          state.error = false;
          state.errorMessage = null;
        }
      )
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = true;
        state.errorMessage = action.payload as string;
      })
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        updateUser.fulfilled,
        (state, action: PayloadAction<TUserResponse>) => {
          state.user = action.payload;
          state.accept = true;
          state.isLoading = false;
          state.error = false;
          state.errorMessage = null;
        }
      )
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = true;
        state.errorMessage = action.payload as string;
      })
      .addCase(getUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        getUser.fulfilled,
        (state, action: PayloadAction<TUserResponse>) => {
          state.user = action.payload;
          state.accept = true;
          state.isLoading = false;
          state.error = false;
          state.errorMessage = null;
        }
      )
      .addCase(getUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = true;
        state.auth = {
          success: false,
          user: { email: '', name: '' },
          refreshToken: '',
          accessToken: ''
        };
        state.errorMessage = JSON.stringify(action.payload);
        state.error = true;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        loginUser.fulfilled,
        (state, action: PayloadAction<TAuthResponse>) => {
          state.auth = action.payload;
          setCookie('accessToken', state.auth.accessToken);
          localStorage.setItem('refreshToken', state.auth.refreshToken);
          state.accept = true;
          state.isLoading = false;
          state.error = false;
          state.errorMessage = null;
        }
      )
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = true;
        state.errorMessage = action.payload as string;
      })
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.accept = true;
        state.auth = null;
        state.user = null;
        state.isLoading = false;
        state.error = false;
        state.errorMessage = null;
        setCookie('accessToken', '');
        localStorage.setItem('refreshToken', '');
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = true;
        state.errorMessage = action.payload as string;
      });
  }
});
