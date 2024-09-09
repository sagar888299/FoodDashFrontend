import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Register action
export const register = createAsyncThunk(
  'auth/register',
  async ({ name, email, password, phone }, thunkAPI) => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', { name, email, password, phone });
      return response.data;  // Return user data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response ? error.response.data : 'Unknown error');
    }
  }
);

// Login action
export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }, thunkAPI) => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      return response.data;  // Return token and user data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response ? error.response.data : 'Invalid credentials');
    }
  }
);

