import { createSlice } from "@reduxjs/toolkit";

interface IUsersState {
  isAuthenticated: boolean;
}

const initialState: IUsersState = {
  isAuthenticated: localStorage.getItem("isAuthenticated") === "true",
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    login(state) {
      state.isAuthenticated = true;
    },

    logout(state) {
      state.isAuthenticated = false;
    },
  },
});

export const { login, logout } = usersSlice.actions;
export const usersReducer = usersSlice.reducer;
