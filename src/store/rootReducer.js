import layout from "./layout";

import packages from "../pages/package/store";
import members from "../pages/member/store";
import assets from "../pages/asset/store";
import auth from "../pages/auth/common/store";
import staffs from "../pages/staff/store";
import rooms from "../pages/room/store";
import feedbacks_staff from "../pages/feedback/store_staff";
import feedbacks_room from "../pages/feedback/store_room";
const rootReducer = {
  members,
  auth,
  layout,
  packages,
  assets,
  staffs,
  rooms,
  feedbacks_staff,
  feedbacks_room,
};
export default rootReducer;
