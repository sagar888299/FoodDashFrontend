import { createSlice } from '@reduxjs/toolkit';
import { getAllRestaurants } from './RestaurantActions'; // Import the thunk action

const initialState = {
  restaurants: [], 
  selectedRestaurant : [],
  loading: false,        
  error: null            
};

const RestaurantSlice = createSlice({
  name: 'restaurant',
  initialState,
  reducers: {
    // You can define other reducers here if needed
    selectRestaurant : (state,action) => {
       state.selectedRestaurant = action.payload;
    }
  },
  extraReducers: (builder) => {
    // Handle the lifecycle of the getAllRestaurants action
    builder.addCase(getAllRestaurants.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getAllRestaurants.fulfilled, (state, action) => {
      state.loading = false;
      state.restaurants = action.payload;
      state.error = null;
    });
    builder.addCase(getAllRestaurants.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || 'Error fetching restaurants';
    });
  }
});

export const { selectRestaurant } = RestaurantSlice.actions;
// Export the reducer to use in the store
export default RestaurantSlice.reducer;
