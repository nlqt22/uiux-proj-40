import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import MemberList from "./MemberList";

import TableLoading from "@/components/skeleton/Table";
import { fetchMembers } from "./store";


const MemberListPage = () =>  {
    const { members, status, error } = useSelector((state) => state.members);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchMembers({page: 0, size: 5}));
    }, [dispatch]);

    if(status === "loading") {
        return (
            <div>
                <TableLoading count={members?.length}/>
            </div>
        );
    }

    if(status === "succeeded") {
        return (
            <div>
                <MemberList members={ members } />
            </div>
        );
    }
};

export default MemberListPage;