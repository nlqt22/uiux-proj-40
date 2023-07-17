import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API = "http://localhost:8080/api/v1/auth/login";


export const handleLogin = (username, password) => async (dispatch) => {
	try {
		const response = await axios.post(API, { username, password });
		if (response.status === 200) {
		  	dispatch(handleLoginSuccess(response.data));
			localStorage.setItem("user", JSON.stringify(response.data));
		}
	} catch (error) {
		dispatch(handleLoginFailure());
		toast.error("Wrong password or username", {
			position: "top-right",
			autoClose: 1500,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: "light",
		});
	}
};

export const handleLogout = () => async (dispatch) => {
	localStorage.removeItem("user");
	dispatch(logout());
}

const logout = () => ({
	type: "auth/logout",
  });
  

const persistedUserData = localStorage.getItem("user");

export const authSlice = createSlice({
  	name: "auth",
  	initialState: {
    	isAuth: persistedUserData ? true : false,
		user: persistedUserData ? JSON.parse(persistedUserData) : null,
  	},
  	reducers: {
    	handleLoginSuccess: (state, action) => {
			state.isAuth = true;
			state.user = action.payload;
    	},

    	handleLoginFailure: (state) => {
      		state.isAuth = false;
			state.user = null;
    	},

		logout: (state) => {
			state.isAuth = false;
			state.user = null;	
		},
	},
});

export const { handleLoginSuccess, handleLoginFailure } = authSlice.actions;
export default authSlice.reducer;
