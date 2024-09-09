import { createSlice } from "@reduxjs/toolkit"
import { getMenu } from "./MenuActions";

const initialState = {
    menuItems : [],
    error : null,
    loading : false,
}

const MenuSlice = createSlice({
    name : "Menu",
    initialState,
    reducers : {

    },
    extraReducers : (builder) => {
        builder.addCase(getMenu.pending, (state)=> {
           state.error = null;
           state.loading = true;
        });
        builder.addCase(getMenu.fulfilled, (state, action) => {
          state.loading = false;
          state.error = null;
          state.menuItems = action.payload.data;
        });
        builder.addCase(getMenu.rejected, (state,action) =>{
            state.error = action.payload || "Error fetching Menu";
            state.loading = false;
        });
    }
});

export default MenuSlice.reducer;