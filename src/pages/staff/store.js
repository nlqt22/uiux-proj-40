import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const API_sale = "http://localhost:9005/api/v1/staffs/sale";
const API_pt = "http://localhost:9005/api/v1/staffs/personal-trainer";

export const fetchStaffsSale = createAsyncThunk(
  "staffs/fetchStaffsSale",
  async ({ page, size, requestBody, jwt }) => {
    const headers = {
      Authorization: "Bearer " + jwt,
      "Content-Type": "application/json",
    };
    try {
      const response = await axios.get(
        `${API_sale}?id=1&page=${page}&size=${size}`,
        { headers }
      );
      return response.data.content;
    } catch (error) {
      throw error;
    }
  }
);

// export const fetchStaffsPt = createAsyncThunk(
//   "staffs/fetchStaffsPt",
//   async ({ page, size, requestBody, jwt }) => {
//     const headers = {
//       Authorization: "Bearer " + jwt,
//       "Content-Type": "application/json",
//     };
//     try {
//       const response = await axios.get(
//         `${API_pt}?id=1&page=${page}&size=${size}`,
//         { headers }
//       );
//       return response.data.content;
//     } catch (error) {
//       throw error;
//     }
//   }
// );

export const staffSlice = createSlice({
  name: "staffs",
  initialState: {
    status: "idle",
    openStaffModal: false,
    error: null,
    staffsSale: [],
    staffsPt: [],
    staffs: [], // Combined staffs array
  },
  reducers: {
    toggleAddModal: (state, action) => {
      state.openStaffModal = action.payload;
    },
    pushStaff: (state, action) => {
      state.staffs.unshift(action.payload);

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
      .addCase(fetchStaffsSale.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchStaffsSale.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.staffsSale = action.payload;
        state.staffs = [...state.staffsSale, ...state.staffsPt]; // Combine staffsSale and staffsPt
      })
      .addCase(fetchStaffsSale.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
    //   .addCase(fetchStaffsPt.pending, (state) => {
    //     state.status = "loading";
    //   })
    //   .addCase(fetchStaffsPt.fulfilled, (state, action) => {
    //     state.status = "succeeded";
    //     state.staffsPt = action.payload;
    //     state.staffs = [...state.staffsSale, ...state.staffsPt]; // Combine staffsSale and staffsPt
    //   })
    //   .addCase(fetchStaffsPt.rejected, (state, action) => {
    //     state.status = "failed";
    //     state.error = action.error.message;
    //   });
  },
});

export const { toggleAddModal, pushStaff } = staffSlice.actions;
export default staffSlice.reducer;
