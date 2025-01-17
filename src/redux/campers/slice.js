import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { fetchCampers, getCamperDetails } from "./operations.js";

const initialState = {
  total: 0,
  items: [],
  selected: null,
  isLoading: false,
  error: null,
};

const slice = createSlice({
  name: "campers",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchCampers.fulfilled, (state, action) => {
        state.items = [...state.items, ...action.payload.items];
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

export default slice.reducer;
