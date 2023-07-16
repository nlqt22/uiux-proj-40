import layout from "./layout";

import members from "../pages/member/store";
import packages from "../pages/package/store";
import staffs from "../pages/staff/store";
import assets from "../pages/asset/store";

const rootReducer = {
  layout,
  members,
  packages,
  assets,
  staffs,
};
export default rootReducer;
