import { configureStore } from "@reduxjs/toolkit";
import announcementsReducer from "../features/announcements/announcementsSlice";
import { quizzesReducer } from "../features/quizzes/quizzesSlice";
import { usersReducer } from "../features/users/usersSlice";

export const store = configureStore({
  reducer: {
    announcements: announcementsReducer,
    quizzes: quizzesReducer,
    users: usersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
