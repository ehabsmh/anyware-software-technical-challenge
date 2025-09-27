import { configureStore } from "@reduxjs/toolkit";
import announcementsReducer from "../features/announcements/announcementsSlice";

export const store = configureStore({
  reducer: {
    announcements: announcementsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
