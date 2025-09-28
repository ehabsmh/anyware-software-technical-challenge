import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import type { IAnnouncement } from "../../interfaces/announcement";
import {
  fetchAllAnnouncements,
  fetchAnnouncementById,
  fetchLatestAnnouncements,
} from "../../services/apiAnnouncements";
import type { RootState } from "../../store/store";

interface IListState {
  items: IAnnouncement[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

interface IAnnouncementState {
  latest: IAnnouncement[];
  all: IListState;
  selectedAnnouncement: IAnnouncement | null;
  loading: boolean;
  error: string | null;
}

const initialState: IAnnouncementState = {
  latest: [],
  all: {
    items: [],
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0,
  },
  selectedAnnouncement: null,
  loading: false,
  error: null,
};

// thunks
export const loadLatest = createAsyncThunk(
  "announcements/loadLatest",
  async () => {
    const data = await fetchLatestAnnouncements();
    return data;
  }
);

export const loadAll = createAsyncThunk(
  "announcements/loadAll",
  async ({ page = 1, limit = 10 }: { page?: number; limit?: number }) => {
    const data = await fetchAllAnnouncements(page, limit);
    return data;
  }
);

export const loadById = createAsyncThunk(
  "announcements/loadById",
  async (id: string) => {
    const data = await fetchAnnouncementById(id);
    return data;
  }
);

// slice
const slice = createSlice({
  name: "announcements",
  initialState,
  reducers: {
    clearSelectedAnnouncement(state) {
      state.selectedAnnouncement = null;
    },
  },
  extraReducers: (builder) => {
    // Load Latest Announcements
    builder.addCase(loadLatest.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(loadLatest.fulfilled, (state, action) => {
      state.loading = false;
      state.latest = action.payload;
    });

    builder.addCase(loadLatest.rejected, (state, action) => {
      state.loading = false;
      state.error =
        action.error.message || "Failed to load latest announcements";
    });

    // Load All Announcements
    builder.addCase(loadAll.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(loadAll.fulfilled, (state, action) => {
      state.loading = false;
      state.all = { ...action.payload };
    });
    builder.addCase(loadAll.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Failed to load all announcements";
    });

    // Load Announcement By ID
    builder.addCase(loadById.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(loadById.fulfilled, (state, action) => {
      state.loading = false;
      state.selectedAnnouncement = action.payload;
    });
    builder.addCase(loadById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Failed to load announcement by ID";
    });
  },
});

export const { clearSelectedAnnouncement } = slice.actions;
export default slice.reducer;

// export const getLatest = (state: RootState) => ({
//   latest: state.announcements.latest,
//   loading: state.announcements.loading,
// });

// export const getAllAnnouncements = (state: RootState) => ({
//   all: state.announcements.all,
//   loading: state.announcements.loading,
// });

export const getAllAnnouncements = createSelector(
  (state: RootState) => state.announcements.all,
  (all) => ({
    items: all.items,
    totalPages: all.totalPages,
    page: all.page,
  })
);

export const getLatest = createSelector(
  (state: RootState) => state.announcements.latest,
  (latest) => [...latest]
);

export const getAnnouncementsInfo = createSelector(
  (state: RootState) => state.announcements.loading,
  (state: RootState) => state.announcements.error,
  (loading, error) => ({
    isLoading: loading,
    hasError: Boolean(error),
  })
);
