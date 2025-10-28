import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { IUser } from "../../interfaces/user";
import { getMe, userLogin } from "../../services/apiAuth";
import { toast } from "sonner";

interface IUserInitialState extends IUser {
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

const initialState: IUserInitialState = {
  _id: "",
  name: "",
  email: "",
  gender: "",
  phone: "",
  role: "user",
  avatar: "",
  enrolledIn: [],
  loading: false,
  error: null,
  isAuthenticated: false,
};

// thunks
export const login = createAsyncThunk(
  "auth/login",
  async (userData: { email: string; password: string }) => {
    const data = await userLogin(userData);
    return data;
  }
);

export const me = createAsyncThunk("auth/me", async () => {
  const data = await getMe();
  return data;
});

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers(builder) {
    // login
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.isAuthenticated = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        Object.assign(state, action.payload);
        state.isAuthenticated = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? null;
        state.isAuthenticated = false;
        toast.error(state.error);
      });

    // get me
    builder
      .addCase(me.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.isAuthenticated = false;
      })
      .addCase(me.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        Object.assign(state, action.payload);
        state.isAuthenticated = true;
      })
      .addCase(me.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? null;
        state.isAuthenticated = false;
      });
  },
});

export const usersReducer = usersSlice.reducer;
