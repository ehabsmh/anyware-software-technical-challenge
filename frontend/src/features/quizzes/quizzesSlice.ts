import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { IQuizUpcoming } from "../../interfaces/quiz";
import { fetchQuizById, fetchUpcomingQuizzes } from "../../services/apiQuizzes";
import type { RootState } from "../../store/store";

interface QuizzesState {
  upcoming: IQuizUpcoming[];
  currentQuiz: IQuizUpcoming | null;
  loading: boolean;
  error: string | null;
}

const initialState: QuizzesState = {
  upcoming: [],
  currentQuiz: null,
  loading: false,
  error: null,
};

// thunks
export const loadUpcomingQuizzes = createAsyncThunk(
  "quizzes/loadUpcoming",
  async () => {
    const data = await fetchUpcomingQuizzes();
    return data;
  }
);

export const loadCurrentQuiz = createAsyncThunk(
  "quizzes/loadCurrentQuiz",
  async (id: string) => {
    const data = await fetchQuizById(id);
    return data;
  }
);

const quizzesSlice = createSlice({
  name: "quizzes",
  initialState,
  reducers: {
    clearCurrentQuiz(state) {
      state.currentQuiz = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // load upcoming quizzes
    builder.addCase(loadUpcomingQuizzes.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(loadUpcomingQuizzes.fulfilled, (state, action) => {
      state.loading = false;
      state.upcoming = action.payload;
    });
    builder.addCase(loadUpcomingQuizzes.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Failed to load upcoming quizzes";
    });

    // load current quiz by id
    builder.addCase(loadCurrentQuiz.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(loadCurrentQuiz.fulfilled, (state, action) => {
      state.loading = false;
      state.currentQuiz = action.payload;
    });
    builder.addCase(loadCurrentQuiz.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Failed to load the quiz";
    });
  },
});

export const { clearCurrentQuiz } = quizzesSlice.actions;
export const quizzesReducer = quizzesSlice.reducer;

export const upcomingQuizzes = (state: RootState) => ({
  upcoming: state.quizzes.upcoming,
  loading: state.quizzes.loading,
});
