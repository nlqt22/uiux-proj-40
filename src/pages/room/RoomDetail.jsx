import React, { Fragment } from "react";
import { useParams } from "react-router-dom";
import Card from "@/components/ui/Card";

import { Tab } from "@headlessui/react";


import Feedback_Room from "./room-detail/feedback-room";
import Asset from "./room-detail/asset";

const RoomDetailsPage = () => {
  const { id } = useParams();
  const buttons = [
    { title: "Asset" },
    { title: "Room Feedback" },
    
  ];
  return (
    <div className=" space-y-5">
      <div className="grid grid-cols-12 gap-5">
        <Card
          title="About project"
          className="xl:col-span-12 col-span-12 lg:col-span-12 h-full"
        >
          <div>
            <div className="text-base font-medium text-slate-800 dark:text-slate-100 mb-3">
              Background information
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-300">

            </p>
            <br />
            <p className="text-sm text-slate-600 dark:text-slate-300">

            </p>
        
            
          </div>
        </Card>
      </div>
      
      <div className="grid grid-cols-12 gap-5">
        <div className="xl:col-span-12 lg:col-span-7 col-span-12">
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
                    <Asset />
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

export default RoomDetailsPage;
