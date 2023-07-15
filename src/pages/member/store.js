import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";

const API = "http://localhost:8080/api/v1/members";

export const fetchMembers = createAsyncThunk("members/fetchMembers", async({ page, size }) => {
    try {
        const response = await axios.get(`${API}?page=${page}&size=${size}`);
        console.log(response);
        return response.data.content;
    } catch(error) {
        throw error;
    }
});

export const memberSlice = createSlice({
    name: "members",
    initialState: {
        status: "idle",
        error: null,
        members: [],
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchMembers.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchMembers.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.members = action.payload;
            })
            .addCase(fetchMembers.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            });
    },
});
export const {}  = memberSlice.actions;
export default memberSlice.reducer;
