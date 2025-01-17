import { createSlice } from "@reduxjs/toolkit";

const handlerToggle = (state, action) => {
  const camperId = action.payload;
  if (state.items.includes(camperId)) {
    state.items = state.items.filter((id) => id !== camperId);
  } else {
    state.items.push(camperId);
  }
};

const slice = createSlice({
  name: "favorites",
  initialState: {
    items: [],
  },
  reducers: {
    toggleFavorite: handlerToggle,
  },
});

export const selectFavorites = (state) => state.favorites.items;
export const { toggleFavorite } = slice.actions;
export default slice.reducer;
