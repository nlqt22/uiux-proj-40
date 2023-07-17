import React, { useRef, useEffect, useState } from "react";
import SidebarLogo from "./Logo";
import Navmenu from "./Navmenu";
import { menuItems, menuItemsForAdmin, menuItemsForPT, menuItemsForSale, menuItemsForMember } from "@/constant/data";
import SimpleBar from "simplebar-react";
import useSidebar from "@/hooks/useSidebar";
import useSemiDark from "@/hooks/useSemiDark";
import useSkin from "@/hooks/useSkin";
import svgRabitImage from "@/assets/images/svg/rabit.svg";
import { useSelector } from "react-redux";

const Sidebar = () => {
	const scrollableNodeRef = useRef();
	const [scroll, setScroll] = useState(false);
	const { user, isAuth } = useSelector((state) => state.auth);

	useEffect(() => {
		const handleScroll = () => {
			if (scrollableNodeRef.current.scrollTop > 0) {
				setScroll(true);
			} else {
				setScroll(false);
			}
		};
		scrollableNodeRef.current.addEventListener("scroll", handleScroll);
	}, [scrollableNodeRef]);

	const [collapsed, setMenuCollapsed] = useSidebar();
	const [menuHover, setMenuHover] = useState(false);

	// semi dark option
	const [isSemiDark] = useSemiDark();
	// skin
	const [skin] = useSkin();
	return (
		<div className={isSemiDark ? "dark" : ""}>
			<div
				className={`sidebar-wrapper bg-white dark:bg-slate-800     
				${collapsed ? "w-[72px] close_sidebar" : "w-[248px]"}
      			${menuHover ? "sidebar-hovered" : ""}
      			${skin === "bordered" ? "border-r border-slate-200 dark:border-slate-700" : "shadow-base"}
    		`}
				onMouseEnter={() => {
					setMenuHover(true);
				}}
				onMouseLeave={() => {
					setMenuHover(false);
				}}
			>
				<SidebarLogo menuHover={menuHover} />
				<div
					className={`h-[60px]  absolute top-[80px] nav-shadow z-[1] w-full transition-all duration-200 pointer-events-none ${scroll ? " opacity-100" : " opacity-0"
						}`}
				></div>

				<SimpleBar
					className="sidebar-menu px-4 h-[calc(100%-80px)]"
					scrollableNodeProps={{ ref: scrollableNodeRef }}
				>

					{user.role === "ADMIN" && <Navmenu menus={menuItemsForAdmin} />}
					{user.role === "PT" && <Navmenu menus={menuItemsForPT} />}
					{user.role === "SALE" && <Navmenu menus={menuItemsForSale} />}
					{user.role === "MEMBER" && <Navmenu menus={menuItemsForMember} />}
					
				</SimpleBar>
			</div>
		</div>
	);
};

export default Sidebar;
