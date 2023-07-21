import React, { useState } from "react";
import Card from "@/components/ui/Card";
import { ToastContainer } from "react-toastify";
import { Navigate } from "react-router-dom";
import Dropdown from "@/components/ui/Dropdown";
import Icon from "@/components/ui/Icon";
import { Menu } from "@headlessui/react";

import Column from "../dashboard/HorizontalBar";
import { useSelector, useDispatch } from "react-redux";

const Dashboard = () => {
	const { isAuth } = useSelector((state) => state.auth)
	const actions = [
		{
			name: "Reset Sort",
			icon: "heroicons-outline:sort-ascending",
		},
		{
			name: "Sort A-Z ",
			icon: "heroicons-outline:sort-ascending",
		},
		{
			name: " Sort Z-A ",
			icon: "heroicons-outline:sort-descending",
		},
	];
	if (!isAuth) {
		return <Navigate to="/login" />;

	} else {
		return (
			<div className=" space-y-5">
				<div className="md:block hidden">
					<Dropdown
						classMenuItems="w-[130px]"
						label={
							<span className="text-lg inline-flex flex-col items-center justify-center h-8 w-8 rounded-full bg-gray-500-f7 dark:bg-slate-900 dark:text-slate-400 bg-slate-100">
								<Icon icon="heroicons-outline:dots-vertical" />
							</span>
						}
					>
						{actions.map((item, i) => (
							<Menu.Item key={i}>
								<div
									className={`
                
                  ${"hover:bg-slate-900 dark:hover:bg-slate-600 dark:hover:bg-opacity-70  dark:text-slate-300 hover:text-white"}
                   w-full border-b border-b-gray-500 border-opacity-10   px-4 py-2 text-sm  last:mb-0 cursor-pointer first:rounded-t last:rounded-b flex  space-x-2 items-center  text-slate-600 capitalize rtl:space-x-reverse `}
								>
									<span className="text-base">
										<Icon icon={item.icon} />
									</span>
									<span>{item.name}</span>
								</div>
							</Menu.Item>
						))}
					</Dropdown>
				</div>
				<Card title="Column Chart">
					<Column />
				</Card>

			</div>
		);
	}
};

export default Dashboard;
