import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getMenu = createAsyncThunk(
    'menu/getMenu',
    async(restaurantId, thunkAPI) => {
        try {
            const response = await axios(`http://localhost:5000/api/menu/restaurant/${restaurantId}`) ;
            return response.data;
        }
        catch(error) {
            return thunkAPI.rejectWithValue(error.response ? error.response.data : "error fetching menu");
        }
    }
)