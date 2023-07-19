import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import useWidth from "@/hooks/useWidth";
import FeedbackList from "./FeedbackListStaff";
import Button from "@/components/ui/Button";
import TableLoading from "@/components/skeleton/Table";
import { fetchFeedbacks_staff } from "./store_staff";
import { fetchFeedbacks_room } from "./store_room";
import { ToastContainer } from "react-toastify";
import FeedbackListStaff from "./FeedbackListStaff";
import FeedbackListRoom from "./FeedbackListRoom";

const FeedbackListPage = () =>  {
    const { feedbacks, status, error } = useSelector((state) => state.feedbacks_staff);
    const { width, breakpoints } = useWidth();

    const { isAuth } = useSelector((state) => state.auth)
    const dispatch = useDispatch();
    const buttons = [
        { title: "Staff" },
        { title: "Room" },
      ];
    useEffect(() => {
        dispatch(fetchFeedbacks_staff({page: 0, size: 5}));
    }, [dispatch]);
    if(!isAuth) {
		return <Navigate to="/login"/>;
    }
    else {
        if(status === "loading") {
            return (
                <div>
                    <TableLoading count={feedbacks?.length}/>
                </div>
            );
        }

        if(status === "succeeded") {
            return (
                <div>
                    <ToastContainer />
                    <div className="flex flex-wrap justify-between items-center mb-4">
                        <h4 className="font-medium lg:text-2xl text-xl capitalize text-slate-900 inline-block ltr:pr-4 rtl:pl-4">
                            Feedbacks
                        </h4>
                        <div
                            className={`${
                                width < breakpoints.md ? "space-x-rb" : ""
                            } 
                                md:flex md:space-x-4 md:justify-end items-center rtl:space-x-reverse`}
                        >
                        </div>
                    </div>
                    <Card title="Room">
            <Tab.Group>
              <Tab.List className="lg:space-x-8 md:space-x-4 space-x-0 rtl:space-x-reverse">
                {buttons.map((item, i) => (
                  <Tab as={Fragment} key={i}>
                    {({ selected }) => (
                      <button
                        className={`text-sm font-medium mb-7 capitalize bg-white
                          dark:bg-slate-800 ring-0 foucs:ring-0 focus:outline-none px-2
                          transition duration-150 before:transition-all before:duration-150 relative 
                          before:absolute before:left-1/2 before:bottom-[-6px] before:h-[1.5px] before:bg-primary-500 
                          before:-translate-x-1/2 
                          ${
                            selected
                              ? "text-primary-500 before:w-full"
                              : "text-slate-500 before:w-0 dark:text-slate-300"
                          }`}
                      >
                        {item.title}
                      </button>
                    )}
                  </Tab>
                ))}
              </Tab.List>
              <Tab.Panels>
                <Tab.Panel>
                  <div className="text-slate-600 dark:text-slate-400 text-sm font-normal">
                    {/* Feedback component */}
                    <FeedbackListStaff />
                  </div>
                </Tab.Panel>
                <Tab.Panel>
                  <div className="text-slate-600 dark:text-slate-400 text-sm font-normal">
                    {/* Feedback component */}
                    <FeedbackListRoom />
                  </div>
                </Tab.Panel>

              </Tab.Panels>
            </Tab.Group>
          </Card>
                    <FeedbackList feedbacks={ feedbacks } />

                </div>
            );
        }
    }
};

export default FeedbackListPage;