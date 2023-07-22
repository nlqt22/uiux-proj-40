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

        const response = await axios.post(API,requestBody,  {headers} );
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
      
        setMember: (state, action) => {
            state.memberSearch = action.payload;
          },
        editMember: (state, action) => {
            state.members.findIndex((item) => {

              if (item.id === action.payload.id) {
                console.log(item.id);
                state.editItem = item;
                state.editModal = !state.editModal;
                // find index
                // let index = state.todos.indexOf(item);
                // state.todos.splice(index, 1, {

                // //   id: action.payload.id,
                // //   title: action.payload.title,
                // //   isDone: action.payload.isDone,
                // //   isfav: action.payload.isfav,
                // //   image: action.payload.image,
                // //   category: action.payload.category,
                // });
              }
            });
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
    setMember,
    editMember,
    closeEditModal,
    removeMember,
} = memberSlice.actions;
export default memberSlice.reducer;