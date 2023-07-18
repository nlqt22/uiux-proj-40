import React, { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// home pages  & dashboard
import Loading from "@/components/Loading";
import Layout from "./layout/Layout";
import { useSelector } from "react-redux";

const Dashboard = lazy(() => import("./pages/dashboard"));
const MemberListPage = lazy(() => import("./pages/member"));
const PackageListPage = lazy(() => import ("./pages/package"));
const StaffListPage  = lazy(() => import ("./pages/staff"));
const AssetListPage  = lazy(() => import ("./pages/asset"));
const Login = lazy(() => import("./pages/auth/login"));
const Error = lazy(() => import("./pages/404"));

function App() {

	const { user, isAuth } = useSelector((state) => state.auth);

	return (
		<main className="App  relative">
			<Routes>
				<Route
					path="/login"
					element={
						<Suspense fallback={<Loading />}>
							<Login />
						</Suspense>
					}
				/> 
				{ ! isAuth && <Route path="*" element={<Navigate to="/login"/>}/> }
				
				{ isAuth &&
				<Route path="/*" element={<Layout />}>
					<Route
						path="dashboard"
						element={
							<Suspense fallback={<Loading />}>
								<Dashboard />
							</Suspense>
						}
					/>

					<Route
						path="member"
						element={
							<Suspense fallback={<Loading />}>
								<MemberListPage />
							</Suspense>
						}
					/>

					<Route
						path="package"
						element={
							<Suspense fallback={<Loading />}>
								<PackageListPage />
							</Suspense>
						}
					/>

					<Route
						path="staff"
						element={
							<Suspense fallback={<Loading />}>
								<StaffListPage />
							</Suspense>
						}
					/>

					<Route
						path="asset"
						element={
							<Suspense fallback={<Loading />}>
								<AssetListPage />
							</Suspense>
						}
					/>

					<Route path="*" element={<Navigate to="/404" />} />
					
				</Route>
				}
				<Route
					path="/404"
					element={
						<Suspense fallback={<Loading />}>
							<Error />
						</Suspense>
					}
				/>
			</Routes>
		</main>
	);
}

export default App;
