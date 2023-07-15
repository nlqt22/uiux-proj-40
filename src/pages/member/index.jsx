import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import MemberList from "./MemberList";

import TableLoading from "@/components/skeleton/Table";


const MemberListPage = () =>  {
    const { width, breakpoints } = useWidth();
    const { memberrs } = useSelector((state) => state.members);
    const dispatch = useDispatch;

    return (
        <div>
            <TableLoading count={members?.length} />

            <MemberList members={members} />
        </div>
    )
}