import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";
import { toast } from "react-toastify";

const API = "http://localhost:9005/api/v1/members";
const API_res = "http://localhost:9005/api/v1/members/register"
export const fetchMembers = createAsyncThunk("members/fetchMembers", async({ page, size,requestBody, jwt }) => {
    
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
export const pushMember = createAsyncThunk("staffs/pushStaff", async ({ requestBody, jwt, role }) => {
    try {
      const headers = {
        Authorization: "Bearer " + jwt,
        "Content-Type": "application/json",
      };


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
  export const editMember = createAsyncThunk("members/editMember", async ({ requestBody, jwt, id }) => {
    try {
      const headers = {
        Authorization: "Bearer " + jwt,
        "Content-Type": "application/json",
      };
      let API_k = API+"/" + id;
      console.log(requestBody);
      const response = await axios.put(API_k, requestBody, { headers });
  
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

  
export const memberSlice = createSlice({
    name: "members",
    initialState: {
        status: "idle",
        openMemberModal: false,
        isLoading: null,
        error: null,
        members: [],
        memberSearch: "",
        editItem: {},
        editModal: false,
    },
    reducers: {
        toggleAddModal: (state, action) => {
            state.openMemberModal = action.payload;
        },
        toggleEditModal: (state, action) => {
          state.editModal = true;
          state.editItem = action.payload;
      },
      
        setMember: (state, action) => {
            state.memberSearch = action.payload;
          },
       
          closeEditModal: (state, action) => {
            state.editModal = action.payload;
          },

          removeMember: (state, action) => {
            state.members = state.members.filter(
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
    toggleEditModal,
    setMember,
    viewMember,
    closeEditModal,
    removeMember,
} = memberSlice.actions;
export default memberSlice.reducer;