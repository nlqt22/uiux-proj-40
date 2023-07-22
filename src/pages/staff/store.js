import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const API_sale = "http://localhost:9005/api/v1/staffs/sale";
const API_pt = "http://localhost:9005/api/v1/staffs/personal-trainer";
const API_ressa = "http://localhost:9005/api/v1/staffs/register-sale"
const API_respt = "http://localhost:9005/api/v1/staffs/register-personal-trainer"

export const fetchStaffsSale = createAsyncThunk(
  "staffs/fetchStaffsSale",
  async ({ page, size, requestBody, jwt }) => {
    const headers = {
      Authorization: "Bearer " + jwt,
      "Content-Type": "application/json",
    };
    try {
      console.log(headers);
      const response = await axios.get(
        `${API_sale}`,
        { headers }
      );
      return response.data.content;
    } catch (error) {
      throw error;
    }
  }
);
export const pushStaff = createAsyncThunk("staffs/pushStaff", async ({ requestBody, jwt, role }) => {
  try {
    const headers = {
      Authorization: "Bearer " + jwt,
      "Content-Type": "application/json",
    };
    
    let API_res = "";
    if (role.value === 3) {
      API_res = API_ressa;
    } else {
      API_res = API_respt;
    }
    const response = await axios.post(API_res, requestBody, { headers });

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

    // Return the response data to be used in the Redux state if needed
    return response.data;
  } catch (error) {
    throw error;
  }
});


export const fetchStaffsPt = createAsyncThunk(
  "staffs/fetchStaffsPt",
  async ({ page, size, requestBody,role, jwt }) => {
    const headers = {
      Authorization: "Bearer " + jwt,
      "Content-Type": "application/json",
    };
    
    try {
      const response = await axios.get(
        `${API_pt}`,
        { headers },
      );
      return response.data.content;
    } catch (error) {
      throw error;
    }
  }
);


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
    removeMember: (state, action) => {
      state.staffs = state.staffs.filter(
        (item) => item.id !== action.payload
      );
      toast.warning("Remove Successfully", {
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
      .addCase(fetchStaffsPt.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchStaffsPt.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.staffsPt = action.payload;
        state.staffs = [...state.staffsSale, ...state.staffsPt]; // Combine staffsSale and staffsPt
      })
      .addCase(fetchStaffsPt.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { toggleAddModal,
  removeMember} = staffSlice.actions;
export default staffSlice.reducer;
