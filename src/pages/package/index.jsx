import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import useWidth from "@/hooks/useWidth";
import PackageList from "./PackageList";
import AddPackage  from "./AddPackage";
import Button from "@/components/ui/Button";
import TableLoading from "@/components/skeleton/Table";
import { fetchPackages } from "./store";
import { ToastContainer } from "react-toastify";
import { toggleAddModal } from "./store";


const PackageListPage = () =>  {
    const { packages, status, error } = useSelector((state) => state.packages);
    const { width, breakpoints } = useWidth();

    const { isAuth } = useSelector((state) => state.auth)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchPackages({page: 0, size: 5}));
    }, [dispatch]);
    if(!isAuth) {
		return <Navigate to="/login"/>;
    }
    else {
        if(status === "loading") {
            return (
                <div>
                    <TableLoading count={packages?.length}/>
                </div>
            );
        }

        if(status === "succeeded") {
            return (
                <div>
                    <ToastContainer />
                    <div className="flex flex-wrap justify-between items-center mb-4">
                        <h4 className="font-medium lg:text-2xl text-xl capitalize text-slate-900 inline-block ltr:pr-4 rtl:pl-4">
                            Packages
                        </h4>
                        <div
                            className={`${
                                width < breakpoints.md ? "space-x-rb" : ""
                            } 
                                md:flex md:space-x-4 md:justify-end items-center rtl:space-x-reverse`}
                        >
                            <Button
                                icon="heroicons-outline:plus"
                                text="Add Package"
                                className="btn-dark dark:bg-slate-800  h-min text-sm font-normal"
                                iconClass=" text-lg"
                                onClick={() => dispatch(toggleAddModal(true))}

                            />
                        </div>
                    </div>
                    <PackageList packages={ packages } />
                    <AddPackage />
                </div>
            );
        }
    }
};

export default PackageListPage;