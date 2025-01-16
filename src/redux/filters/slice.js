import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  location: "",
  equipment: {
    AC: false,
    transmission: "manual", // "automatic"
    kitchen: false,
    TV: false,
    bathroom: false,
    refrigerator: false,
    form: "", // "van", "fullyIntegrated", "alcove"
  },
};

const slice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setLocation(state, action) {
      state.location = action.payload;
    },
    setEquipment(state, action) {
      state.equipment = action.payload;
    },
    resetFilters(state) {
      state.location = initialState.location;
      state.equipment = initialState.equipment;
    },
  },
});

export const selectLocation = (state) => state.filters.location;
export const selectEquipment = (state) => state.filters.equipment;
export const { setLocation, setEquipment, resetFilters } = slice.actions;
export default slice.reducer;
