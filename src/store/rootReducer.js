import layout from "./layout";

import packages from "../pages/member/store";
import members from "../pages/member/store";
import assets from "../pages/member/store";
import auth from "../pages/auth/common/store";
import staffs from "../pages/member/store";

const rootReducer = {
  members,
  auth,
  layout,
  packages,
  assets,
  staffs,
};
export default rootReducer;
