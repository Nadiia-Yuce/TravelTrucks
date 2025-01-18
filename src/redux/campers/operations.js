import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

axios.defaults.baseURL = import.meta.env.VITE_SERVER_URL;

export const fetchCampers = createAsyncThunk(
  "campers/getAll",
  async ({ page = 1, limit = 4, filters = {} }, thunkAPI) => {
    try {
      //Початкова кверя, для пагінації
      let query = `?page=${page}&limit=${limit}`;

      //Перевірка на значення фільтрів (якщо є не дефолтні зміни, то цей фільтр додається у кверю)
      Object.keys(filters).forEach((key) => {
        const filterValue = filters[key];
        if (filterValue !== "" && filterValue !== false) {
          query += `&${key}=${filterValue}`;
        }
      });

      const res = await axios.get(query);
      return res.data;
    } catch (error) {
      toast.error("Error loading camper data!");
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getCamperDetails = createAsyncThunk(
  "campers/getDetails",
  async (id, thunkAPI) => {
    try {
      const res = await axios.get(`/${id}`);
      return res.data;
    } catch (error) {
      toast.error("Error loading camper details!");
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
