import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";
import { toast } from "react-toastify";

const API = "http://localhost:8080/api/v1/rooms";

export const fetchRooms = createAsyncThunk("rooms/fetchRooms", async ({ page, size }) => {
    try {
        const response = await axios.get(`${API}?page=${page}&size=${size}`);
        return response.data.content;
    } catch (error) {
        throw error;
    }
});

export const roomSlice = createSlice({
    name: "rooms",
    initialState: {
        status: "idle",
        openRoomModal: false,
        isLoading: null,
        error: null,
        rooms: [],
    },
    reducers: {
        toggleAddModal: (state, action) => {
            state.openRoomModal = action.payload;
        },
        pushRoom: (state, action) => {
            state.rooms.unshift(action.payload);

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
            .addCase(fetchRooms.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchRooms.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.rooms = action.payload;
            })
            .addCase(fetchRooms.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            });
    },
});
export const {
    toggleAddModal,
    pushRoom,
} = roomSlice.actions;
export default roomSlice.reducer;