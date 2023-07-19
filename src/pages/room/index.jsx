import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import useWidth from "@/hooks/useWidth";
import RoomList from "./RoomList";
import Button from "@/components/ui/Button";
import TableLoading from "@/components/skeleton/Table";
import { fetchRooms } from "./store";
import { ToastContainer } from "react-toastify";
import { Navigate } from "react-router-dom";
import AddRoom from "./AddRoom";
import { toggleAddModal } from "./store";



const RoomListPage = () =>  {
    const { rooms, status, error } = useSelector((state) => state.rooms);
    const { width, breakpoints } = useWidth();

    const { isAuth } = useSelector((state) => state.auth)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchRooms({page: 0, size: 5}));
    }, [dispatch]);

    if(!isAuth) {
		return <Navigate to="/login"/>;
    } else {
        if(status === "loading") {
            return (
                <div>
                    <TableLoading count={rooms?.length}/>
                </div>
            );
        }

        if(status === "succeeded") {
            return (
                <div>
                    <ToastContainer />
                    <div className="flex flex-wrap justify-between items-center mb-4">
                        <h4 className="font-medium lg:text-2xl text-xl capitalize text-slate-900 inline-block ltr:pr-4 rtl:pl-4">
                            Rooms
                        </h4>
                        <div
                            className={`${
                                width < breakpoints.md ? "space-x-rb" : ""
                            } 
                                md:flex md:space-x-4 md:justify-end items-center rtl:space-x-reverse`}
                        >
                            <Button
                                icon="heroicons-outline:plus"
                                text="Add room"
                                className="btn-dark dark:bg-slate-800  h-min text-sm font-normal"
                                iconClass=" text-lg"
                                onClick={() => dispatch(toggleAddModal(true))}
                            />
                        </div>
                    </div>
                    <RoomList rooms={ rooms } />
                    <AddRoom />
                </div>
            );
        }
    }
};

export default RoomListPage;