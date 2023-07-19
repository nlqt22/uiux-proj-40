import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";
import { toast } from "react-toastify";

const API = "http://localhost:8080/api/v1/assets";

export const fetchAssets = createAsyncThunk("assets/fetchAssets", async({ page, size }) => {
    try {
        const response = await axios.get(`${API}?page=${page}&size=${size}`);
        console.log(response);
        return response.data.content;
    } catch(error) {
        throw error;
    }
});

export const assetSlice = createSlice({
    name: "assets",
    initialState: {
        status: "idle",
        openAssetModal: false,
        error: null,
        assets: [],
    },
    reducers: {
        toggleAddModal: (state, action) => {
            state.openAssetModal = action.payload;
        },
        pushAsset: (state, action) => {
            state.assets.unshift(action.payload);

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
            .addCase(fetchAssets.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchAssets.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.assets = action.payload;
            })
            .addCase(fetchAssets.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            });
    },
});
export const {
    toggleAddModal,
    pushAsset,
}  = assetSlice.actions;
export default assetSlice.reducer;