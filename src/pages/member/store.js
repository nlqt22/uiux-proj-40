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
        openMemberModal: false,
        isLoading: null,
        error: null,
        members: [],
    },
    reducers: {
        toggleAddModal: (state, action) => {
            state.openMemberModal = action.payload;
          },
        pushMember: (state, action) => {
            state.members.unshift(action.payload);
      
            toast.success("Add Successfully", {
              position: "top-right",
              autoClose: 1500,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          },
    },
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
export const {
    toggleAddModal,
    pushMember,
}  = memberSlice.actions;
export default memberSlice.reducer;
