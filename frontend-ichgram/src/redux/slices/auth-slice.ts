import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import loginUserApi from '../../shared/api/loginUser-api.ts';
import { getCurrentUserApi } from '../../shared/api/loginUser-api.ts';
import { logoutUserApi } from '../../shared/api/loginUser-api.ts';
import type { RootState } from '../store.ts';

type LoginPayloadType = {
  email: string;
  password: string;
};


export const login = createAsyncThunk<
  any, // можно уточнить тип ответа
  LoginPayloadType,
  { rejectValue: string }
>(
  "auth/login", 
  async (payload, { rejectWithValue }) => {
    try {
      const data = await loginUserApi(payload);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const logout = createAsyncThunk<
  void,
  void,
  { rejectValue: string }
>(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await logoutUserApi();
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const getCurrent = createAsyncThunk<any, // можно уточнить тип ответа
 void,
  { state: RootState; rejectValue: string }
>(
  "auth/getCurrent", 
  async (_, { getState, rejectWithValue }) => {
    try {
      const store = getState()
      const data = await getCurrentUserApi(store.auth.token)
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export interface IAuthState {
  user: any | null;  // лучше заменить any на конкретный тип пользователя, если есть
  token: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: IAuthState = {
  user: null,
  token: null,
  loading: false,
  error: null
}

const authSlice = createSlice({
	name: "auth" ,
	initialState: initialState,
    reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
	extraReducers: builder => {
        builder.addCase(login.pending, (store)=> {
            store.loading = true;
            store.error = null;
        })
        .addCase(login.fulfilled, (store, {payload})=> {
            store.loading = false;
            store.token = payload.result.token
            store.user = payload.result.user;
        })
        .addCase(login.rejected, (store, {payload})=> {
            store.loading = false;
            store.error = payload ?? "Unknown error";
        })
        .addCase(getCurrent.pending, (store)=> {
            store.loading = true;
            store.error = null;
        })
        .addCase(getCurrent.fulfilled, (store, {payload})=> {
            store.loading = false;
            store.token = payload.token;
            store.user = payload.user;
        })
        .addCase(getCurrent.rejected, ()=> initialState)
        .addCase(logout.fulfilled, () => initialState)
        .addCase(logout.rejected, (store, { payload }) => {
            store.error = payload ?? "Logout failed";
})
			},
})

export default authSlice.reducer;
export const { clearError } = authSlice.actions
