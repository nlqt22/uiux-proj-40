import { createSlice } from "@reduxjs/toolkit"
import { v4 as uuidv4 } from "uuid"

import { toast } from "react-toastify";

export const memberSlice = createSlice({
    name: "member",
    initialState: {
        openMemberModal: false,
        isLoading: null,
        editItem: {},
        editModal: false,
        members: [
            {
                id: uuidv4(),
                name: "Nguyen Van A",
                phone: "0984748193",
            },
        ],
    },
    reducers: {
    }
});
export const {}  = memberSlice.actions;
export default memberSlice.reducer;
