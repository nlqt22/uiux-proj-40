import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";

const API = "http://localhost:8080/api/v1/packages";

export const fetchPackages = createAsyncThunk("packages/fetchPackages", async({ page, size }) => {
    try {
        const response = await axios.get(`${API}?page=${page}&size=${size}`);
        console.log(response);
        return response.data.content;
    } catch(error) {
        throw error;
    }
});

export const packageSlice = createSlice({
    name: "packages",
    initialState: {
        status: "idle",
        error: null,
        packages: [],
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPackages.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchPackages.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.packages = action.payload;
            })
            .addCase(fetchPackages.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            });
    },
});
export const {}  = packageSlice.actions;
export default packageSlice.reducer;
