import React, { useState } from "react";
import Card from "@/components/ui/Card";
import { ToastContainer } from "react-toastify";
import { Navigate } from "react-router-dom";


import Column from "../dashboard/HorizontalBar";
import { useSelector, useDispatch } from "react-redux";

const Dashboard = () => {
    const { isAuth } = useSelector((state) => state.auth)

	if(!isAuth) {
		return <Navigate to="/login"/>;
		
	} else {
		return (


			 <div className=" space-y-5">
			 	<Card title="Column Chart">
			   <Column />
			 </Card>
			 
		   </div>
		);
	}
};

export default Dashboard;
