import { createSlice } from "@reduxjs/toolkit";

const handlerToggle = (state, action) => {
  const camper = action.payload;
  const exist = state.items.some((item) => item.id === camper.id);
  if (exist) {
    state.items = state.items.filter((item) => item.id !== camper.id);
  } else {
    state.items.push(camper);
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
