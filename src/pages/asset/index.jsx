import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import useWidth from "@/hooks/useWidth";
import AssetList from "./AssetList";
import AddAsset from "./AddAsset"
import Button from "@/components/ui/Button";
import TableLoading from "@/components/skeleton/Table";
import { fetchAssets } from "./store";
import { ToastContainer } from "react-toastify";
import { toggleAddModal } from "./store";


const AssetListPage = () =>  {
    const { assets, status, error } = useSelector((state) => state.assets);
    const { width, breakpoints } = useWidth();

    const dispatch = useDispatch();
    const { isAuth,user } = useSelector((state) => state.auth)


    useEffect(() => {

        dispatch(fetchAssets({page: 0, size: 5,  jwt: user.access_token }));
    }, [dispatch]);

    if(status === "loading") {
        return (
            <div>
                <TableLoading count={assets?.length}/>
            </div>
        );
    }

    if(status === "succeeded") {
        return (
            <div>
                <ToastContainer />
                <div className="flex flex-wrap justify-between items-center mb-4">
                    <h4 className="font-medium lg:text-2xl text-xl capitalize text-slate-900 inline-block ltr:pr-4 rtl:pl-4">
                        Assets
                    </h4>
                    <div
                        className={`${
                            width < breakpoints.md ? "space-x-rb" : ""
                        } 
                            md:flex md:space-x-4 md:justify-end items-center rtl:space-x-reverse`}
                    >
                        <Button
                            icon="heroicons-outline:plus"
                            text="Add Asset"
                            className="btn-dark dark:bg-slate-800  h-min text-sm font-normal"
                            iconClass=" text-lg"
                            onClick={() => dispatch(toggleAddModal(true))}
                        />
                    </div>
                </div>
                <AssetList assets={ assets } />
                <AddAsset />
            </div>
        );
    }
};

export default AssetListPage;