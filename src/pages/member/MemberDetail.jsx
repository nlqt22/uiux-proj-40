import React, { Fragment, useEffect,useState  } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import Card from "@/components/ui/Card";
import axios from "axios";

import { Tab } from "@headlessui/react";


import Feedback_Room from "./member-detail/feedback-room";
import Feedback_Staff from "./member-detail/feedback-staff";
import Staff from "./member-detail/staff";
import Payment from "./member-detail/payment";
import Track from "./member-detail/track";

const MemberDetailsPage = () => {
  const { id } = useParams();
  const [memberInfo, setMemberInfo] = useState(null);
  const { isAuth, user } = useSelector((state) => state.auth)
  const dispatch = useDispatch();
  useEffect(() => {
    const requestBody = {
      id: id,
    };
    const jwt = user.access_token; 
    const API = "http://localhost:9005/api/v1/members/"+id
    const headers = {
      Authorization: "Bearer " + jwt,
      "Content-Type": "application/json",
    };
    
    // Make the POST request using axios
    axios
      .get(API, { headers })
      .then((response) => {
        setMemberInfo(response.data);
        console.log("Response:", response.data);
      })
      .catch((error) => {
  
        console.error("Error:", error);
      });
  }, [id, user.access_token, dispatch]);

  const buttons = [
    { title: " Feedback" },
    { title: "Payment" },
    { title: "Track" },
  ];
  return (
    <div className=" space-y-5">
      <div className="grid grid-cols-12 gap-5">
        <Card
          title="About member"
          className="xl:col-span-12 col-span-12 lg:col-span-12 h-full"
        >
          <div>
            <div className="text-base font-medium text-slate-800 dark:text-slate-100 mb-3">
              Information
            </div>
            {memberInfo ? ( // Check if memberInfo is available before rendering
        <Fragment>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            ID: {memberInfo.id}
          </p>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Full Name: {memberInfo.fullName}
          </p>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Phone: {memberInfo.phone}
          </p>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Identity Card: {memberInfo.identityCard}
          </p>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Date of Birth: {new Date(memberInfo.dob).toLocaleDateString()}
          </p>
        </Fragment>
      ) : (
        // Render a loading message or any placeholder if memberInfo is not available yet
        <p>Loading member information...</p>
      )}
            <br />
            <p className="text-sm text-slate-600 dark:text-slate-300">

            </p>
        
            
          </div>
        </Card>
      </div>
      
      <div className="grid grid-cols-12 gap-5">
        <div className="xl:col-span-12 lg:col-span-7 col-span-12">
        <Card title="Member">
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
                    <Track />
                  </div>
                </Tab.Panel>
                <Tab.Panel>
                  <div className="text-slate-600 dark:text-slate-400 text-sm font-normal">
                    {/* Content for Tab 2 */}
                    <Payment />
                  </div>
                </Tab.Panel>
                <Tab.Panel>
                  <div className="text-slate-600 dark:text-slate-400 text-sm font-normal">
                    {/* Content for Tab 2 */}
                    <Staff />
                  </div>
                </Tab.Panel>

                <Tab.Panel>
                  <div className="text-slate-600 dark:text-slate-400 text-sm font-normal">
                    {/* Content for Tab 2 */}
                    <Feedback_Room />
                  </div>
                </Tab.Panel>
              </Tab.Panels>
            </Tab.Group>
          </Card>
        </div>
        <div className="xl:col-span-4 lg:col-span-5 col-span-12">
         
        </div>
      </div>
    </div>
  );
};

export default MemberDetailsPage;
