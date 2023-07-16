import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import useWidth from "@/hooks/useWidth";
import StaffList from "./StaffList";
import Button from "@/components/ui/Button";
import TableLoading from "@/components/skeleton/Table";
import { fetchStaffs } from "./store";
import { ToastContainer } from "react-toastify";


const StaffListPage = () =>  {
    const { staffs, status, error } = useSelector((state) => state.staffs);
    const { width, breakpoints } = useWidth();

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchStaffs({page: 0, size: 5}));
    }, [dispatch]);

    if(status === "loading") {
        return (
            <div>
                <TableLoading count={staffs?.length}/>
            </div>
        );
    }

    if(status === "succeeded") {
        return (
            <div>
                <ToastContainer />
                <div className="flex flex-wrap justify-between items-center mb-4">
                    <h4 className="font-medium lg:text-2xl text-xl capitalize text-slate-900 inline-block ltr:pr-4 rtl:pl-4">
                        Staffs
                    </h4>
                    <div
                        className={`${
                            width < breakpoints.md ? "space-x-rb" : ""
                        } 
                            md:flex md:space-x-4 md:justify-end items-center rtl:space-x-reverse`}
                    >
                        <Button
                            icon="heroicons-outline:plus"
                            text="Add Staff"
                            className="btn-dark dark:bg-slate-800  h-min text-sm font-normal"
                            iconClass=" text-lg"
                        />
                    </div>
                </div>
                <StaffList staffs={ staffs } />
            </div>
        );
    }
};

export default StaffListPage;