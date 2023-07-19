import React, { Fragment } from "react";
import { useParams } from "react-router-dom";
import Card from "@/components/ui/Card";
import { Tab } from "@headlessui/react";
import Feedback from "./feedback-table";
import Member from  "./member-table";

const StaffDetailsPage = () => {
  const { id } = useParams();

  const buttons = [
    { title: "Feedback" },
    { title: "Member" },
  ];

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-12 gap-5">
        <Card
          title="About Staff"
          className="xl:col-span-12 col-span-12 lg:col-span-12 h-full"
        >
          <div>
            <div className="text-base font-medium text-slate-800 dark:text-slate-100 mb-3">
              Background information
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              This is some background information about the project. Replace
              this text with your actual content.
            </p>
            <br />
            <p className="text-sm text-slate-600 dark:text-slate-300">
              More details about the project can be mentioned here. Feel free
              to customize and replace this content.
            </p>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-12 gap-5">
        <div className="xl:col-span-12 lg:col-span-7 col-span-12">
          <Card title="Staff">
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
                    <Feedback />
                  </div>
                </Tab.Panel>
                <Tab.Panel>
                  <div className="text-slate-600 dark:text-slate-400 text-sm font-normal">
                    {/* Content for Tab 2 */}
                    <Member />
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

export default StaffDetailsPage;
