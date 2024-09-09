import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Fetch all restaurants action
export const getAllRestaurants = createAsyncThunk(
  'restaurant/getAllRestaurants',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('http://localhost:5000/api/restaurants'); // Your API endpoint for restaurants
      return response.data.data; // Assuming the data is in response.data.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response ? error.response.data : 'Error fetching restaurants');
    }
  }
);
