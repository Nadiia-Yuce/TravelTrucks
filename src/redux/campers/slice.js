import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { fetchCampers, getCamperDetails } from "./operations.js";

const initialState = {
  pagination: { page: 1, limit: 4 },
  total: 0,
  items: [],
  selected: null,
  isLoading: false,
  error: null,
};

const slice = createSlice({
  name: "campers",
  initialState,
  reducers: {
    resetItems(state) {
      state.items = [];
    },
    resetPage(state) {
      state.pagination.page = 1;
    },
    setPage(state, action) {
      state.pagination.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCampers.fulfilled, (state, action) => {
        //Фільтрація вже існуючих карток, уникання дублювання
        const newItems = action.payload.items.filter(
          (newItem) =>
            !state.items.some((existedItem) => newItem.id === existedItem.id)
        );

        state.items = [...state.items, ...newItems];
        state.total = action.payload.total;
        state.isLoading = false;
      })
      .addCase(getCamperDetails.fulfilled, (state, action) => {
        state.selected = action.payload;
        state.isLoading = false;
      })
      .addMatcher(
        isAnyOf(fetchCampers.pending, getCamperDetails.pending),
        (state) => {
          state.isLoading = true;
          state.error = null;
        }
      )
      .addMatcher(
        isAnyOf(fetchCampers.rejected, getCamperDetails.rejected),
        (state, action) => {
          state.isLoading = false;
          // Передасть в помилку те, що прокинули у thunkAPI.rejectWithValue()
          state.error = action.payload;
        }
      );
  },
});

export const { resetItems, resetPage, setPage } = slice.actions;
export default slice.reducer;
