import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";
import { toast } from "react-toastify";

const API = "http://localhost:9005/api/v1/equipments";


export const fetchAssets = createAsyncThunk("assets/fetchAssets", async({ page, size,requestBody, jwt }) => {
    
    const headers = {
        'Authorization': 'Bearer ' + jwt,
        'Content-Type': 'application/json',
    }
    try {

        const response = await axios.get(API, {headers} );
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