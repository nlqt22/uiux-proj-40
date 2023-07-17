import React, { useState } from "react";
import Card from "@/components/ui/Card";
import { ToastContainer } from "react-toastify";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Dashboard = () => {
    const { isAuth } = useSelector((state) => state.auth)

	if(!isAuth) {
		return <Navigate to="/login"/>;
	} else {
		return (
			<div>
				  <ToastContainer />
				  <Card title="Starter Kit">Your Dashboard</Card>
			</div>
		);
	}
};

export default Dashboard;
