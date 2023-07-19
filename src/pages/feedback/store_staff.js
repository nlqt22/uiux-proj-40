import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";
import { toast } from "react-toastify";

const API = "http://localhost:8080/api/v1/feedbacks";

export const fetchFeedbacks_staff = createAsyncThunk("feedbacks/fetchFeedbacks", async({ page, size }) => {
    try {
        const response = await axios.get(`${API}/staff?page=${page}&size=${size}`);
        console.log(response);
        return response.data.content;
    } catch(error) {
        throw error;
    }
});

export const feedbackSlice_staff = createSlice({
    name: "feedbacks_staff",
    initialState: {
        status: "idle",
        openFeedbackModal: false,
        error: null,
        feedbacks_staff: [],
    },
    reducers: {
        
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchFeedbacks_staff.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchFeedbacks_staff.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.feedbacks = action.payload;
            })
            .addCase(fetchFeedbacks_staff.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            });
    },
});
export const {}  = feedbackSlice_staff.actions;
export default feedbackSlice_staff.reducer;

