import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { IUser } from "../../interfaces/user";
import {
  getMe,
  userDemoLogin,
  userLogin,
  userLogout,
} from "../../services/apiAuth";
import { toast } from "sonner";

interface IUserInitialState extends IUser {
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  isLoadingUser: boolean;
}

const initialState: IUserInitialState = {
  _id: "",
  name: "",
  email: "",
  gender: "",
  phone: "",
  role: "student",
  avatar: "",
  loading: false,
  error: null,
  isAuthenticated: false,
  isLoadingUser: true,
};

// thunks
export const login = createAsyncThunk(
  "auth/login",
  async (userData: { email: string; password: string }) => {
    const { user } = await userLogin(userData);
    return user;
  }
);

export const demoLogin = createAsyncThunk(
  "auth/login/demo/:role",
  async (userRole: "student" | "instructor") => {
    const { user } = await userDemoLogin(userRole);
    return user;
  }
);

export const me = createAsyncThunk("auth/me", async () => {
  const { user } = await getMe();
  return user;
});

export const logout = createAsyncThunk("auth/logout", async () => {
  await userLogout();
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearUser(state) {
      Object.assign(state, initialState);
    },
  },
  extraReducers(builder) {
    // login
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.isAuthenticated = false;
        state.isLoadingUser = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        Object.assign(state, action.payload);
        state.isAuthenticated = true;
        state.isLoadingUser = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? null;
        state.isAuthenticated = false;
        state.isLoadingUser = false;
        toast.error(state.error);
      });

    // Demo Login
    builder
      .addCase(demoLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.isAuthenticated = false;
        state.isLoadingUser = true;
      })
      .addCase(demoLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        Object.assign(state, action.payload);
        state.isAuthenticated = true;
        state.isLoadingUser = false;
      })
      .addCase(demoLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? null;
        state.isAuthenticated = false;
        state.isLoadingUser = false;
        toast.error(state.error);
      });

    // get me
    builder
      .addCase(me.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.isAuthenticated = false;
        state.isLoadingUser = true;
      })
      .addCase(me.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        Object.assign(state, action.payload);
        state.isAuthenticated = true;
        state.isLoadingUser = false;
      })
      .addCase(me.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? null;
        state.isAuthenticated = false;
        state.isLoadingUser = false;
      });

    // logout
    builder
      .addCase(logout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
        state.isAuthenticated = false;
        Object.assign(state, initialState);
        state.isLoadingUser = false;
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? null;
        state.isAuthenticated = false;
        state.isLoadingUser = false;
      });
  },
});

export const userReducer = userSlice.reducer;
