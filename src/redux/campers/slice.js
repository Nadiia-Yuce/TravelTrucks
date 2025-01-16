import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_SERVER_URL;

const fetchCampers = createAsyncThunk("campers/getAll", async (_, thunkAPI) => {
  try {
    const res = await axios.get("/campers");
    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

const getCamperDetails = createAsyncThunk(
  "campers/getDetails",
  async (id, thunkAPI) => {
    try {
      const res = await axios.get(`/campers/${id}`);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const initialState = {
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
        state.items = action.payload;
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
          state.error = action.error.message;
        }
      );
  },
});

export default slice.reducer;
