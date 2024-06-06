import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../services/store';
import {
  TLoginData,
  TRegisterData,
  TAuthResponse,
  TUserResponse,
  loginUserApi,
  registerUserApi,
  getUserApi,
  updateUserApi,
  logoutApi,
  refreshToken
} from '../../utils/burger-api';

import { setCookie } from '../../utils/cookie';
import { access } from 'fs';

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

// Actions
export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (userData: TLoginData, { rejectWithValue }) => {
    try {
      const response = await loginUserApi(userData);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const logoutUser = createAsyncThunk(
  'user/logoutUser',
  async (_, { rejectWithValue }) => {
    try {
      const response = await logoutApi();
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (userData: TRegisterData, { rejectWithValue }) => {
    try {
      const response = await registerUserApi(userData);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (userData: TRegisterData, { rejectWithValue }) => {
    try {
      const response = await updateUserApi(userData);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const getUser = createAsyncThunk(
  'user/getUser',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getUserApi();
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    /*
    resetUser: (state) => {
      setCookie('accessToken', '');
      //setCookie('refreshToken', '');
      localStorage.setItem(
        'refreshToken',
        state.auth ? state.auth.refreshToken : ''
      );
      state.auth = null;
      state.user = null;
      state.accept = false;
      state.isLoading = false;
      state.error = false;
      state.errorMessage = null;
    }
    */
    // Other reducers can be added here
  },
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
          console.log('registerUser.fulfilled', state.auth);
        }
      )
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = true;
        state.errorMessage = action.payload as string;
        console.log('registerUser.rejected', action, state.errorMessage);
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
          console.log('updateUser.fulfilled', state.auth);
        }
      )
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = true;
        state.errorMessage = action.payload as string;
        console.log('updateUser.rejected', action, state.errorMessage);
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
          console.log('getUser.fulfilled', state.auth);
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
        //const { success, message }: { success?: boolean; message?: string } =
        //  action.payload as { success?: boolean; message?: string };
        //state.errorMessage = message ? message : 'Unknown error'; //action.payload as string;
        //state.error = !success;
        //state.errorMessage = (action.payload as string).toString();
        state.errorMessage = JSON.stringify(action.payload);
        state.error = true;
        console.log('getUser.rejected', action, state.errorMessage);
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
          //setCookie('refreshToken', state.auth.refreshToken);
          state.accept = true;
          state.isLoading = false;
          state.error = false;
          state.errorMessage = null;
          console.log('loginUser.fulfilled', action, state.auth);
        }
      )
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = true;
        state.errorMessage = action.payload as string;
        console.log('loginUser.rejected', action, state.errorMessage);
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
        console.log('logoutUser.fulfilled', action.payload);
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = true;
        state.errorMessage = action.payload as string;
        console.log('logoutUser.rejected', state.errorMessage);
      });
    // More cases for other async thunks
  }
});
//export const { resetUser } = userSlice.actions;
//export default userSlice.reducer;
