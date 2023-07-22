import React from "react";
import Card from "@/components/ui/Card";
import Icon from "@/components/ui/Icon";

import { useNavigate } from "react-router-dom";

const StaffList = ({ staffs }) => {
  const navigate = useNavigate();
  const actions = [
    {
      name: "edit",
      icon: "heroicons:pencil-square",
      doit: (staff) => {
        dispatch(removeMember(staff.id))
      },
    },
    {
      name: "view",
      icon: "heroicons:eye",
      doit: (staff) => {
            navigate(`/staff/${staff.id}`)
      },
    },
    {
      name: "delete",
      icon: "heroicons-outline:trash",
      doit: (staff) => {

      },
    },
  ];

  return (
    <>
      <Card noborder>
        <div className="md:flex justify-between items-center mb-6">
          <h4 className="card-title">Staffs List</h4>
        </div>
        <div className="overflow-x-auto -mx-6">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden ">
              <table className="min-w-full divide-y divide-slate-100 table-fixed dark:divide-slate-700">
                <thead className="bg-slate-100 dark:bg-slate-700">
                  <tr>
                    <th scope="col" className="table-th">
                      Full Name
                    </th>
                    <th scope="col" className="table-th">
                      Phone
                    </th>
                    <th scope="col" className="table-th">
                      Identity Card
                    </th>
                    <th scope="col" className="table-th">
                      Date of Birth
                    </th>
                    <th scope="col" className="table-th">
                      Role
                    </th>
                    <th scope="col" className="table-th">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody className="bg-white divide-y divide-slate-100 dark:bg-slate-800 dark:divide-slate-700">
                  {staffs.map((staff) => (
                    <tr
                      key={staff.id}
                      className="even:bg-slate-100 dark:even:bg-slate-700"
                    >
                      <td className="table-td">{staff.fullName}</td>
                      <td className="table-td">{staff.phone}</td>
                      <td className="table-td">{staff.identityCard}</td>
                      <td className="table-td">{staff.dob.split("T")[0]}</td>
                      <td className="table-td">{staff.account.role.name}</td>
                      <td className="table-td">
                        <div className="divide-y divide-slate-100 dark:divide-slate-800">
                          <div className="flex space-x-2 items-center rtl:space-x-reverse">
                            {actions.map((item, i) => (
                              <div
                                key={i}
                                onClick={() => item.doit(staff)}
                                className={`
                                  ${
                                    item.icon === "heroicons-outline:trash"
                                      ? "bg-danger-500 text-danger-500 bg-opacity-30 hover:bg-opacity-100 hover:text-white"
                                      : "hover:bg-slate-900 hover:text-white dark:hover:bg-slate-600 dark:hover:bg-opacity-50"
                                  }
                                  border-b border-b-gray-500 border-opacity-10 px-4 py-2 text-sm last:mb-0 cursor-pointer 
                                  flex space-x-2 items-center
                                `}
                              >
                                <span className="text-base">
                                  <Icon icon={item.icon} />
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Card>
    </>
  );
};

export default StaffList;
