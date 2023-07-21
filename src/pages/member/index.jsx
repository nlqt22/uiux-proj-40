import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import useWidth from "@/hooks/useWidth";
import MemberList from "./MemberList";
import Button from "@/components/ui/Button";
import TableLoading from "@/components/skeleton/Table";
import { fetchMembers, } from "./store";
import { ToastContainer } from "react-toastify";
import { Navigate } from "react-router-dom";
import AddMember from "./AddMember";
import SearchMember from "./SearchMember";
import { toggleAddModal, setMember } from "./store";
import EditMember from "./EditMember";



const MemberListPage = () =>  {
    const { members, status, error,memberSearch } = useSelector((state) => state.members);
    const { width, breakpoints } = useWidth();

    const { isAuth, user } = useSelector((state) => state.auth)
    const dispatch = useDispatch();
    useEffect(() => {
        const requestBody = {
            id: user.organzation_id,
        }
        dispatch(fetchMembers({page: 0, size: 5, requestBody: requestBody, jwt: user.access_token }));
    }, [dispatch]);
    const filterMembers = members.filter((member) => {
        if (memberSearch) {
          const searchQuery = memberSearch.toLowerCase();
          return (
            member.fullName.toLowerCase().includes(searchQuery) ||
            member.phone.includes(memberSearch) ||
            member.identityCard.includes(memberSearch)
          );
        }
        return true;
      });
      
    useEffect(() => {
        dispatch(fetchMembers({page: 0, size: 5}));
    }, [dispatch]);


    if(!isAuth) {
		return <Navigate to="/login"/>;
    } else {
        if(status === "loading") {
            return (
                <div>
                    <TableLoading count={filterMembers?.length}/>
                </div>
            );
        }

        if(status === "succeeded") {
            return (
                <div>
                    <ToastContainer />
                    <div className="flex flex-wrap justify-between items-center mb-4">
                        <h4 className="font-medium lg:text-2xl text-xl capitalize text-slate-900 inline-block ltr:pr-4 rtl:pl-4">
                            Members
                        </h4>

                        <div
                            className={`${
                                width < breakpoints.md ? "space-x-rb" : ""
                            } 
                                md:flex md:space-x-4 md:justify-end items-center rtl:space-x-reverse`}
                        >
                            <Button
                                icon="heroicons-outline:plus"
                                text="Add member"
                                className="btn-dark dark:bg-slate-800  h-min text-sm font-normal"
                                iconClass=" text-lg"
                                onClick={() => dispatch(toggleAddModal(true))}
                            />
                        </div>
                    </div>
                    <SearchMember
                            onChange={(e) => dispatch(setMember(e.target.value))}
                        />
                    <MemberList members={ filterMembers } />
                    <AddMember />
                    <EditMember />
                </div>
            );
        }
    }
};

export default MemberListPage;