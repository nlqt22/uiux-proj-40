import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";
import { toast } from "react-toastify";

const API = "http://localhost:8080/api/v1/feedbacks";

export const fetchFeedbacks_room = createAsyncThunk("feedbacks/fetchFeedbacks", async({ page, size }) => {
    try {
        const response = await axios.get(`${API}/room?page=${page}&size=${size}`);
        console.log(response);
        return response.data.content;
    } catch(error) {
        throw error;
    }
});

export const feedbackSlice_room = createSlice({
    name: "feedbacks_room",
    initialState: {
        status: "idle",
        openFeedbackModal: false,
        error: null,
        feedbacks_room: [],
    },
    reducers: {
        
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchFeedbacks_room.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchFeedbacks_room.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.feedbacks = action.payload;
            })
            .addCase(fetchFeedbacks_room.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            });
    },
});
export const {

}  = feedbackSlice_room.actions;
export default feedbackSlice_room.reducer;

