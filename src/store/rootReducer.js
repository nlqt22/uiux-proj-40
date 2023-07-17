import layout from "./layout";

import members from "../pages/member/store";
import auth from "../pages/auth/common/store";
const rootReducer = {
  layout,
  members,
  auth,
};
export default rootReducer;
