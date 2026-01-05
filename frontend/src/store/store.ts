import { configureStore } from "@reduxjs/toolkit";
import { quizzesReducer } from "../features/quizzes/quizzesSlice";
import { userReducer } from "../features/users/usersSlice";

export const store = configureStore({
  reducer: {
    quizzes: quizzesReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
