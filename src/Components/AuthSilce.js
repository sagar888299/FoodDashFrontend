import { createSlice } from "@reduxjs/toolkit";
import { register, login} from "./AuthActions"; 
import { toast } from "react-toastify";

const initialState = {
    user: null,         
    refreshToken: null,     
    accessToken: null,      
    isAuthenticated: false, 
    loading: false,        
    error: null             
};

const AuthSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        // Action to handle logout
        logout: (state) => {
            state.user = null;
            state.accessToken = null;
            state.refreshToken = null;
            state.isAuthenticated = false;
            toast.success('Logout Successfullly');
        },
        setToken : (state,action) => {
            state.refreshToken = action.payload.refreshToken;
            state.accessToken = action.payload.accessToken;
        }
    },
    extraReducers: (builder) => {
        // Register
        builder.addCase(register.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(register.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload.user; 
            state.isAuthenticated = true;
            state.error = null;
            toast.success("Registered Successfully");
           
        });
        builder.addCase(register.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload || "Registration failed";
            toast.error("Registration failed");
        });

        // Login
        builder.addCase(login.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(login.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload.user;
            state.accessToken = action.payload.token;
            state.refreshToken = action.payload.refreshToken;
            state.isAuthenticated = true;
            state.error = null;
            toast.success("Login Successfully");
        });
        builder.addCase(login.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload || "Login failed";
            toast.error("Login failed");
        });
    }
});

export const { logout, setToken } = AuthSlice.actions;
export default AuthSlice.reducer;
