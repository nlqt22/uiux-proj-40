import React, { lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// home pages  & dashboard
//import Dashboard from "./pages/dashboard";
const Dashboard = lazy(() => import("./pages/dashboard"));
const Member = lazy(() => import("./pages/member"))
import Layout from "./layout/Layout";
import MemberList from "./pages/member/MemberList";
function App() {
  return (
    <main className="App  relative">
      <Routes>
        <Route path="/*" element={<Layout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="member" element={<MemberList />} />
          <Route path="*" element={<Navigate to="/404" />} />
        </Route>

      </Routes>
    </main>
  );
}

export default App;
