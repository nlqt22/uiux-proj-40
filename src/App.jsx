import React, { lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// home pages  & dashboard
//import Dashboard from "./pages/dashboard";
const Dashboard = lazy(() => import("./pages/dashboard"));
const Member = lazy(() => import("./pages/member"));
const Package = lazy(() => import("./pages/package"));
import Layout from "./layout/Layout";
import MemberListPage from "./pages/member";
import PackageListPage from "./pages/package";
import StaffListPage from "./pages/staff";
import AssetListPage from "./pages/asset";
function App() {
  return (
    <main className="App  relative">
      <Routes>
        <Route path="/*" element={<Layout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="member" element={<MemberListPage />} />
          <Route path="package" element={<PackageListPage />} />
          <Route path="staff" element={<StaffListPage />} />
          <Route path="asset" element={<AssetListPage />} />
          <Route path="*" element={<Navigate to="/404" />} />
        </Route>
      </Routes>
    </main>
  );
}


export default App;
