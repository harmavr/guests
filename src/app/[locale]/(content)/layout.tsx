import React from "react";
import PrimaryNavigation from "./components/navigation/mainNavigation/primaryNavigation";
import SecondaryMainNavigation from "./components/navigation/mainNavigation/secondaryNavigation";

export default function Layout({ children }) {
	return (
		<div className=" shadow-lg ">
			<PrimaryNavigation />
			<SecondaryMainNavigation />
			{children}
		</div>
	);
}
