import Card from "@/components/ui/Card";

const MemberList = ({members}) => {

    return (
        <>
            <Card noborder>
            <div className="md:flex justify-between items-center mb-6">
                <h4 className="card-title">Members List</h4>
            </div>
            <div className="overflow-x-auto -mx-6">
                <div className="inline-block min-w-full align-middle">
                    <div className="overflow-hidden ">
                        <table className="min-w-full divide-y divide-slate-100 table-fixed dark:divide-slate-700">
                        <thead className=" bg-slate-100 dark:bg-slate-700">
                            <tr>
                                <th scope="col" className=" table-th">
                                    Name
                                </th>
                                <th scope="col" className=" table-th">
                                    Phone
                                </th>
                                <th scope="col" className=" table-th">
                                    Identity Card
                                </th>
                                <th scope="col" className=" table-th">
                                    Date of birth
                                </th>
                            </tr>
                        </thead>

                        <tbody className="bg-white divide-y divide-slate-100 dark:bg-slate-800 dark:divide-slate-700">
                            { members.map((member) => {
                                return (
                                    <tr key={member.id} className=" even:bg-slate-100 dark:even:bg-slate-700">
                                        <td className="table-td">
                                            { member.fullName }
                                        </td>
                                        <td className="table-td">
                                            { member.phone }
                                        </td>
                                        <td className="table-td">
                                            { member.identityCard }
                                        </td>
                                        <td className="table-td">
                                            { member.dob }
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>

                        </table>
                    </div>
                </div>
            </div>

            </Card>
        </>
    );
};

export default MemberList;