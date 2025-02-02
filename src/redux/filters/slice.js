// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   location: "",
//   AC: false,
//   transmission: "", // "automatic", "manual"
//   kitchen: false,
//   TV: false,
//   bathroom: false,
//   refrigerator: false,
//   form: "", // "panelTruck", "fullyIntegrated", "alcove"
// };

// const slice = createSlice({
//   name: "filters",
//   initialState,
//   reducers: {
//     setFilters(state, action) {
//       Object.keys(action.payload).forEach((key) => {
//         if (key in state) {
//           state[key] = action.payload[key];
//         }
//       });
//     },
//     resetFilters() {
//       return initialState;
//     },
//   },
// });

// export const selectFilters = (state) => state.filters;
// export const { setFilters, resetFilters } = slice.actions;
// export default slice.reducer;
