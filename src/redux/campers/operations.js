import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_SERVER_URL;

export const fetchCampers = createAsyncThunk(
  "campers/getAllOrFiltered",
  async ({ page = 1, filters = {} }, thunkAPI) => {
    try {
      //Початкова кверя, для пагінації
      let query = `?${page}&limit=4`;

      //Перевірка на значення фільтрів (якщо є не дефолтні зміни, то цей фільтр додається у кверю)
      Object.keys(filters).forEach((key) => {
        const filterValue = filters[key];
        if (filterValue !== "" && filterValue !== false) {
          query += `&${key}=${filterValue}`;
        }
      });

      const res = await axios.get(`/campers?${query}`);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getCamperDetails = createAsyncThunk(
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
