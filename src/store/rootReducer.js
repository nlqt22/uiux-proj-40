import layout from "./layout";

import packages from "../pages/package/store";
import members from "../pages/member/store";
import assets from "../pages/asset/store";
import auth from "../pages/auth/common/store";
import staffs from "../pages/staff/store";

const rootReducer = {
  members,
  auth,
  layout,
  packages,
  assets,
  staffs,
};
export default rootReducer;
